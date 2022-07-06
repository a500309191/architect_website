from arch.models import *
import os
from datetime import datetime


def getForeignKeysValues():
    Roofs = Roof.objects.all()
    Styles = Style.objects.all()
    Materials = Material.objects.all()

    foreignKeyTables = [Roofs, Styles, Materials]
    foreignKeysValues = {}

    for table in foreignKeyTables:
        for row in table:
            foreignKeysValues.setdefault(str(row), int(row.id))

    return foreignKeysValues


