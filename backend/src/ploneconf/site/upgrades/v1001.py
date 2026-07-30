from plone import api

import logging


logger = logging.getLogger(__name__)


def cleanup_site_structure(setup_tool):
    portal = api.portal.get()

    # Create the expected site structure
    if "training" not in portal:
        api.content.create(
            container=portal, type="Document", id="training", title="Training"
        )

    if "schedule" not in portal:
        schedule_folder = api.content.create(
            container=portal, type="Document", id="schedule", title="Schedule"
        )
    else:
        schedule_folder = portal["schedule"]
    schedule_folder_url = schedule_folder.absolute_url()

    if "location" not in portal:
        api.content.create(
            container=portal, type="Document", id="location", title="Location"
        )

    if "sponsors" not in portal:
        api.content.create(
            container=portal, type="Document", id="sponsors", title="Sponsors"
        )

    if "sprint" not in portal:
        api.content.create(
            container=portal, type="Document", id="sprint", title="Sprint"
        )

    # Find all talks
    brains = api.content.find(portal_type="talk")
    for brain in brains:
        if schedule_folder_url in brain.getURL():
            # Skip if the talk is already somewhere inside the target folder
            continue
        obj = brain.getObject()
        # Move talk to the folder '/schedule'
        api.content.move(source=obj, target=schedule_folder, safe_id=True)
        logger.info(f"{obj.absolute_url()} moved to {schedule_folder_url}")
