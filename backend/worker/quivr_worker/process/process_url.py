from uuid import UUID

from langchain_core.vectorstores import VectorStore
from quivr_api.logger import get_logger
from quivr_api.modules.brain.service.brain_service import BrainService
from quivr_api.modules.brain.service.brain_vector_service import BrainVectorService

from quivr_worker.files import build_file
from quivr_worker.parsers.crawler import URL, extract_from_url, slugify
from quivr_worker.process.process_file import (
    process_file,
)

logger = get_logger("celery_worker")


async def process_url_func(
    url: str,
    brain_id: UUID,
    knowledge_id: UUID,
    brain_service: BrainService,
    brain_vector_service: BrainVectorService,
    document_vector_store: VectorStore,
):
    crawl_website = URL(url=url)

    extracted_content = extract_from_url(crawl_website)
    extracted_content_bytes = extracted_content.encode("utf-8")
    file_name = slugify(crawl_website.url) + ".txt"

    brain = brain_service.get_brain_by_id(brain_id)
    if brain is None:
        logger.error("It seems like you're uploading knowledge to an unknown brain.")
        return 1

    with build_file(extracted_content_bytes, knowledge_id, file_name) as file_instance:
        # TODO(@StanGirard): fix bug
        # NOTE (@aminediro): I think this might be related to knowledge delete timeouts ?
        await process_file(
            file_instance=file_instance,
            brain=brain,
            brain_service=brain_service,
            document_vector_store=document_vector_store,
            brain_vector_service=brain_vector_service,
            integration=None,
            integration_link=None,
        )
