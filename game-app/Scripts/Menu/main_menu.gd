extends Control

@onready var settings = $SettingsGUI/Settings
@onready var id_input = $CanvasLayer/Panel/MarginContainer/HBoxContainer/IDInput
const SAVE_FILE_PATH = "user://player_settings.cfg"


func _ready() -> void:
	load_player_id()


func _on_id_input_text_changed(new_text: String) -> void:
	save_player_id(new_text)


func save_player_id(id: String) -> void:
	var config = ConfigFile.new()
	config.set_value("player", "id", id)
	config.save(SAVE_FILE_PATH)
	

func load_player_id() -> void:
	var config = ConfigFile.new()
	if config.load(SAVE_FILE_PATH) == OK:
		if config.has_section_key("player", "id"):
			id_input.text = config.get_value("player", "id", "")


func _on_play_pressed() -> void:
	get_tree().change_scene_to_file("res://Scenes/Levels/main_level.tscn")


func _on_quit_pressed() -> void:
	get_tree().quit()


func _on_settings_pressed() -> void:
	settings.visible = true
