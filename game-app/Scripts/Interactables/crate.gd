extends StaticBody2D

@export var health: float = 1.0
@onready var hero = $"../Hero"
@onready var reward_popup = $"../Popup/RewardPopup"


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
	# print("Crate destroyed")

	send_claim_request()

	await get_tree().create_timer(4.0).timeout
	queue_free()


func load_player_id() -> String:
	var config = ConfigFile.new()
	if config.load("user://player_settings.cfg") == OK:
		if config.has_section_key("player", "id"):
			return config.get_value("player", "id", "")
	return ""


func send_claim_request() -> void:
	var request = $HTTPRequest
	var url = "http://localhost:3001/api/rewards/claim-random-reward"
	var headers = ["Content-Type: application/json"]
	# var body = JSON.stringify({
	# 	# "userId": "9887e122-43d7-4161-8c22-a40b2180e091"
	# 	"userId": "bd796c58-4184-4d07-b28e-f53baafd3dd9"
	# })
	var player_id = load_player_id()

	if player_id == "":
		print("No player ID found.")
		return

	var body = JSON.stringify({
		"userId": player_id
	})


	var error = request.request(url, headers, HTTPClient.METHOD_POST, body)

	if error != OK:
		print("Failed to make request: ", error)


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


func _on_http_request_request_completed(_result: int, response_code: int, _headers: PackedStringArray, body: PackedByteArray) -> void:
	if response_code == 200 or response_code == 201:
		var response = JSON.parse_string(body.get_string_from_utf8())
		var reward_name = response["name"]
		# print("Reward received:", response)
		show_reward_popup(reward_name)
	else:
		print("Failed to claim reward. Response code:", response_code)


func show_reward_popup(reward_name: String) -> void:
	reward_popup.text = "🏆 You claimed: " + reward_name
	reward_popup.self_modulate.a = 0.0
	reward_popup.visible = true

	var tween = create_tween()
	tween.tween_property(reward_popup, "self_modulate:a", 1.0, 0.2) # Fade in
	tween.tween_interval(2.0)
	tween.tween_property(reward_popup, "self_modulate:a", 0.0, 0.5) # Fade out

	await tween.finished
	reward_popup.visible = false
