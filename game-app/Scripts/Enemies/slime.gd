extends CharacterBody2D

@onready var anim_tree = $AnimationTree
@onready var anim_state = anim_tree.get("parameters/playback")

enum SlimeState {
	IDLE,
	WALK,
	DESTROY,
	STUN
}

var current_state: SlimeState = SlimeState.IDLE
var direction: Vector2 = Vector2.DOWN

@export var speed: float = 15.0
@export var state_duration_min: float = 0.5
@export var state_duration_max: float = 2.0
@export var health: int = 3
@export var stun_duration: float = 1.0

var state_timer: float = 0.0

var DIR_4 = [
	Vector2.UP,
	Vector2.DOWN,
	Vector2.LEFT,
	Vector2.RIGHT
]


func _ready():
	randomize()
	_enter_idle()


func _physics_process(delta: float) -> void:
	match current_state:
		SlimeState.IDLE, SlimeState.WALK:
			state_timer -= delta
			if state_timer <= 0.0:
				_choose_next_state()
		SlimeState.STUN:
			state_timer -= delta
			if state_timer <= 0.0:
				_enter_idle()
		SlimeState.DESTROY:
			velocity = Vector2.ZERO

	if current_state == SlimeState.WALK:
		velocity = direction * speed
	else:
		velocity = Vector2.ZERO

	move_and_slide()


func _choose_next_state():
	var rand = randi_range(0, 1)
	if rand == 0:
		_enter_idle()
	else:
		_enter_walk()


func _enter_idle():
	current_state = SlimeState.IDLE
	state_timer = randf_range(state_duration_min, state_duration_max)
	anim_tree.set("parameters/Idle/blend_position", direction)
	anim_state.travel("Idle")


func _enter_walk():
	current_state = SlimeState.WALK
	state_timer = randf_range(state_duration_min, state_duration_max)
	direction = DIR_4[randi() % 4]
	anim_tree.set("parameters/Walk/blend_position", direction)
	anim_state.travel("Walk")


func _enter_stun():
	current_state = SlimeState.STUN
	state_timer = stun_duration
	anim_tree.set("parameters/Stun/blend_position", direction)
	anim_state.travel("Stun")


func _enter_destroy():
	current_state = SlimeState.DESTROY
	velocity = Vector2.ZERO
	anim_tree.set("parameters/Destroy/blend_position", direction)
	anim_state.travel("Destroy")


func _on_hitbox_area_entered(area: Area2D) -> void:
	if area.name == "Sword":
		health -= 1
		if health <= 0:
			_enter_destroy()
		else:
			_enter_stun()


func remove():
	if current_state != SlimeState.DESTROY:
		_enter_destroy()
	else:
		queue_free()