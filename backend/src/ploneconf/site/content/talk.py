from plone import schema
from plone.app.dexterity import textindexer
from plone.app.textfield import RichText
from plone.autoform import directives
from plone.dexterity.content import Container
from plone.supermodel import model
from z3c.form.browser.checkbox import CheckBoxFieldWidget
from z3c.form.browser.radio import RadioFieldWidget
from z3c.relationfield.schema import RelationChoice
from z3c.relationfield.schema import RelationList
from zope.interface import implementer


class ITalk(model.Schema):
    """Dexterity schema for Talks"""

    directives.widget(type_of_talk=RadioFieldWidget)
    type_of_talk = schema.Choice(
        title="Type of talk",
        vocabulary="ploneconf.types_of_talk",
        required=True,
    )

    textindexer.searchable("details")
    details = RichText(
        title="Details",
        description="Description of the talk (max. 2000 characters)",
        max_length=2000,
        required=True,
    )

    directives.widget(audience=CheckBoxFieldWidget)
    audience = schema.Set(
        title="Audience",
        value_type=schema.Choice(
            vocabulary="ploneconf.audiences",
        ),
        required=False,
    )

    textindexer.searchable("speaker")
    speakers = RelationList(
        title="Speakers",
        description="Speakers of the talk",
        value_type=RelationChoice(vocabulary="ploneconf.speakers"),
        required=False,
        default=[],
    )

    room = schema.Choice(
        title="Room",
        vocabulary="ploneconf.rooms",
        required=False,
    )


@implementer(ITalk)
class Talk(Container):
    """Talk instance class"""
