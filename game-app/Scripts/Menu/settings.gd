extends Control

@onready var input_button_scene = preload("res://Scenes/Menu/input_button.tscn")
@onready var action_list = $Panel/MarginContainer/VBoxContainer/ScrollContainer/ActionList
var is_remapping = false
var action_to_remap = null
var remapping_button = null


var input_actions = {
	"Up": "Move up",
	"Down": "Move down",
	"Left": "Move left",
	"Right": "Move right",
	"Jump": "Jump",
	"Sword": "Swing sword",
	"Hammer": "Swing hammer",
}


func _ready() -> void:
	create_action_list()


func create_action_list() -> void:
	InputMap.load_from_project_settings()
	for item in action_list.get_children():
		item.queue_free()
	
	for action in input_actions:
		var button = input_button_scene.instantiate()
		var action_label = button.find_child("LabelAction")
		var input_label = button.find_child("LabelInput")
		
		if action_label:
			action_label.text = input_actions[action]
		
		var events = InputMap.action_get_events(action)
		if input_label:
			input_label.text = events[0].as_text().trim_suffix(" (Physical)") if events.size() > 0 else ""
		
		action_list.add_child(button)
		button.pressed.connect(_on_input_button_pressed.bind(button, action))


func _on_input_button_pressed(button: Button, action: String) -> void:
	if !is_remapping:
		is_remapping = true
		action_to_remap = action
		remapping_button = button
		button.find_child("LabelInput").text = "Press a key..."


func _input(event: InputEvent) -> void:
	if is_remapping:
		if event is InputEventKey or (event is InputEventMouseButton and event.pressed):
			if event is InputEventMouseButton and event.double_click:
				event.double_click = false
			
			InputMap.action_erase_events(action_to_remap)
			InputMap.action_add_event(action_to_remap, event)
			update_action_list(remapping_button, event)
			
			is_remapping = false
			action_to_remap = null
			remapping_button = null
			
			accept_event()
			
			release_all_actions()


func update_action_list(button: Button, event: InputEvent) -> void:
	var input_label = button.find_child("LabelInput")
	if input_label:
		input_label.text = event.as_text().trim_suffix(" (Physical)")


func _on_save_close_pressed() -> void:
	release_all_actions()
	
	if is_remapping:
		is_remapping = false
		action_to_remap = null
		if remapping_button:
			var input_label = remapping_button.find_child("LabelInput")
			if input_label:
				var events = InputMap.action_get_events(action_to_remap)
				input_label.text = events[0].as_text().trim_suffix(" (Physical)") if events.size() > 0 else ""
		remapping_button = null
	
	visible = false


func release_all_actions() -> void:
	for action in input_actions.keys():
		Input.action_release(action)