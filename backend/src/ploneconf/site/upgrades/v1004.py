from plone import api
from Products.CMFPlone.interfaces import constrains

import logging


logger = logging.getLogger(__name__)


def configure_talk_permissions(context):
    talks_folder = api.content.get("/schedule")

    # Allow logged-in users to create content
    api.group.grant_roles(
        groupname="AuthenticatedUsers", roles=["Contributor"], obj=talks_folder
    )

    # Constrain addable types to talk
    behavior = constrains.ISelectableConstrainTypes(talks_folder)
    behavior.setConstrainTypesMode(constrains.ENABLED)
    behavior.setLocallyAllowedTypes(["talk"])
    behavior.setImmediatelyAddableTypes(["talk"])
    logger.info(f"Added and configured {talks_folder.absolute_url()}")
