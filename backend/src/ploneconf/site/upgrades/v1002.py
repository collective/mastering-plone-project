from plone import api

import logging


logger = logging.getLogger(__name__)


def update_indexes(setup_tool):
    # Reindexing content
    for brain in api.content.find(portal_type=["talk", "sponsor"]):
        obj = brain.getObject()
        obj.reindexObject()
        logger.info(f"{obj.id} reindexed.")
