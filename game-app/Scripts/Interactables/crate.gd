extends StaticBody2D

@export var health: float = 1.0
@onready var hero = $"../Hero"


func _on_hit_box_area_entered(area: Area2D) -> void:
	if area.name == "Sword":
		shake()
		throw_hero_away()

	if area.name == "Hammer":
		health -= 1.0

		if health <= 0:
			destroy()
			

func destroy() -> void:
	$AnimationPlayer.play("Destroyed")
	await $AnimationPlayer.animation_finished
	queue_free()


func shake() -> void:
	var shake_amount = 4.0
	var rotation_amount = 5.0 # degrees
	var shake_duration = 0.4
	var original_position = position
	var original_rotation = rotation_degrees

	var tween = create_tween()
	var steps = 8
	var single_step_duration = shake_duration / steps

	for i in range(steps):
		var offset = Vector2(
			randf_range(-shake_amount, shake_amount),
			randf_range(-shake_amount, shake_amount)
		)
		var angle = randf_range(-rotation_amount, rotation_amount)

		tween.tween_property(
			self,
			"position",
			original_position + offset,
			single_step_duration
		).set_trans(Tween.TRANS_ELASTIC).set_ease(Tween.EASE_IN_OUT)

		tween.parallel().tween_property(
			self,
			"rotation_degrees",
			angle,
			single_step_duration
		).set_trans(Tween.TRANS_ELASTIC).set_ease(Tween.EASE_IN_OUT)

	# Reset position and rotation at the end
	tween.tween_property(self, "position", original_position, single_step_duration).set_trans(Tween.TRANS_BACK)
	tween.parallel().tween_property(self, "rotation_degrees", original_rotation, single_step_duration).set_trans(Tween.TRANS_BACK)


func throw_hero_away() -> void:
	var reverse_dir = global_position.direction_to(hero.global_position)
	hero.knockback_velocity = reverse_dir * 50.0 * health