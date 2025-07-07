extends CharacterBody2D

const COLLISION_MASK_WATER: int = 256

@onready var anim_tree = $AnimationTree
@onready var anim_state = anim_tree.get("parameters/playback")
@onready var health_bar = $HealthBar

enum hero_state {
	MOVE,
	JUMP,
	SWORD,
	HAMMER,
	DROWNING,
	DEAD
}
var current_state: hero_state = hero_state.MOVE

var input_movement: Vector2 = Vector2.ZERO
var speed: float = 70.0
var knockback_velocity: Vector2 = Vector2.ZERO

@export var knockback_decay: float = 800.0
@export var health: float = 5.0


func _ready() -> void:
	$Sword/CollisionShape2D.disabled = true
	$Hammer/CollisionShape2D.disabled = true
	health_bar.max_value = health
	health_bar.value = health


func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		goto_main_menu()


func _physics_process(delta: float) -> void:
	if current_state == hero_state.DEAD:
		dead()
		return
	
	if current_state == hero_state.DROWNING:
		drown(delta)
		return

	match current_state:
		hero_state.MOVE:
			move()
		hero_state.JUMP:
			jump()
		hero_state.SWORD:
			sword()
		hero_state.HAMMER:
			hammer()
	
	knockback_velocity = knockback_velocity.move_toward(Vector2.ZERO, knockback_decay * delta)
	velocity += knockback_velocity
	move_and_slide()

	if raycast_for_water() and current_state != hero_state.DROWNING:
		current_state = hero_state.DROWNING


func move():
	input_movement = Input.get_vector("Left", "Right", "Up", "Down")

	if input_movement != Vector2.ZERO:
		anim_tree.set("parameters/Idle/blend_position", input_movement)
		anim_tree.set("parameters/Walk/blend_position", input_movement)
		anim_tree.set("parameters/Sword/blend_position", input_movement)
		anim_tree.set("parameters/Hammer/blend_position", input_movement)
		anim_tree.set("parameters/Jump/blend_position", input_movement)
		anim_tree.set("parameters/Dead/blend_position", input_movement)

		anim_state.travel("Walk")
		velocity = input_movement.normalized() * speed
	
	if input_movement == Vector2.ZERO:
		anim_state.travel("Idle")
		velocity = Vector2.ZERO

	if Input.is_action_just_pressed("Jump"):
		current_state = hero_state.JUMP

	if Input.is_action_just_pressed("Sword"):
		current_state = hero_state.SWORD

	if Input.is_action_just_pressed("Hammer"):
		current_state = hero_state.HAMMER
	
	move_and_slide()


func jump():
	anim_state.travel("Jump")
	move_and_slide()


func sword():
	anim_state.travel("Sword")


func hammer():
	anim_state.travel("Hammer")


func dead():
	anim_state.travel("Dead")


func on_state_reset():
	current_state = hero_state.MOVE


func _on_hit_box_area_entered(area: Area2D) -> void:
	if area.name == "HurtBox":
		take_damage(1.0, area)


func take_damage(amount: float, area: Area2D):
	if current_state == hero_state.DEAD:
		return

	health -= amount
	var knockback_dir = (global_position - area.global_position).normalized()
	knockback_velocity = knockback_dir * 200.0

	if health <= 0:
		health = 0
		current_state = hero_state.DEAD
	update_health_bar()


func update_health_bar():
	health_bar.value = health
	

func raycast_for_water() -> bool:
	var space_state = get_world_2d().direct_space_state
	var query = PhysicsPointQueryParameters2D.new()
	query.position = global_position
	query.collide_with_bodies = true
	query.collision_mask = COLLISION_MASK_WATER

	var result = space_state.intersect_point(query, 1)
	return result.size() > 0


func drown(delta: float):
	anim_state.travel("Idle")
	velocity = Vector2.ZERO
	health -= 0.7 * delta
	update_health_bar()

	if health <= 0:
		health = 0
		current_state = hero_state.DEAD


func goto_main_menu() -> void:
	get_tree().change_scene_to_file("res://Scenes/Menu/main_menu.tscn")


func restart():
	get_tree().reload_current_scene()
