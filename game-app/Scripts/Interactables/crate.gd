extends StaticBody2D


func _on_hit_box_area_entered(area: Area2D) -> void:
	if area.name == "Hammer":
		$AnimationPlayer.play("Destroyed")
		await $AnimationPlayer.animation_finished
		queue_free()
