from django.core.files import File
from datetime import datetime
from . getHousePlans import housePlans
from arch.models import Plan

def createPlans(housesDirs, firstHouseId):
	id = firstHouseId
	for houseDir in housesDirs:
		plans = housePlans(houseDir)
		id += 1
		for plan in plans:
			d = {}
			planDir = '{}\{}'.format(houseDir, plan)
			planFile = File(open(planDir, 'rb'))

			d.setdefault('plan', planFile)
			d.setdefault('time_update', datetime.now())
			d.setdefault('house_id', id)

			plan = Plan(**d)
			plan.attachment = planFile
			plan.save()
			planFile.close()