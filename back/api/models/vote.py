
from django.db import models
from api.models.bigpicture import BigPicture
from django.contrib.auth.models import User
import datetime
import statistics


	# def save(self, *args, **kwargs):
	# 	if not self.pk:
	# 		super(Votation, self).save(*args, **kwargs)
	# 		for choice in self.choices.all():
	# 			Result.create(choice=choice, votation=self)
	# 	else:
	# 		super(Votation, self).save(*args, **kwargs)


# class Result(models.Model):
# 	choice = models.ForeignKey(BigPicture, on_delete=models.CASCADE)
# 	voteCount = models.IntegerField(default=0)
# 	mean = models.FloatField(default=0.)
# 	median = models.FloatField(default=0.)
# 	variance = models.FloatField(default=0.)
# 	votation = models.ForeignKey(BigPicture, blank=True, related_name="results", on_delete=models.CASCADE)

# 	class Meta:
# 		constraints = [
# 			models.UniqueConstraint(fields=['choice', 'votation'], name='unique_result')
# 		]

# 	def compute(self):
# 		values = self.ratings.values_list('value', flat=True)
# 		self.voteCount = len(values)
# 		self.mean = statistics.mean(values)
# 		self.median = statistics.median(values)
# 		self.variance = statistics.variance(values)
# 		self.save()


# class Vote(models.Model):
# 	votation = models.ForeignKey(BigPicture, related_name="votes", on_delete=models.CASCADE)
# 	author = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)

# 	class Meta:
# 		constraints = [
# 			models.UniqueConstraint(fields=['votation', 'author'], name='unique_vote')
# 		]


class Rating(models.Model):
	value = models.FloatField(default=0.)
	reasons = models.ManyToManyField(BigPicture)
	target = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='evaluations')
	votation = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='ratings')
	# vote = models.ForeignKey(Vote, blank=True, on_delete=models.CASCADE, related_name="ratings")
	# result = models.ForeignKey(Result, on_delete=models.CASCADE, related_name="ratings")
	author = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)

	class Meta:
		constraints = [
			models.UniqueConstraint(fields=['target', 'author'], name='unique_rating')
		]

	def __unicode__(self):
		return self.id
