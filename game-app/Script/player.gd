extends CharacterBody2D

@onready var anim_tree = $AnimationTree
@onready var anim_state = anim_tree.get("parameters/playback")

enum hero_state {
    MOVE,
    JUMP,
    SWORD,
    HAMMER,
    DEAD
}
var current_state: hero_state = hero_state.MOVE

var input_movement: Vector2 = Vector2.ZERO
var speed: float = 70.0


func _ready() -> void:
    $Sword/CollisionShape2D.disabled = true


func _physics_process(_delta: float) -> void:
    match current_state:
        hero_state.MOVE:
            move()
        hero_state.JUMP:
            jump()
        hero_state.SWORD:
            sword()
        hero_state.HAMMER:
            hammer()
        hero_state.DEAD:
            pass
    

func move():
    input_movement = Input.get_vector("Left", "Right", "Up", "Down")

    if input_movement != Vector2.ZERO:
        anim_tree.set("parameters/Idle/blend_position", input_movement)
        anim_tree.set("parameters/Walk/blend_position", input_movement)
        anim_tree.set("parameters/Sword/blend_position", input_movement)
        anim_tree.set("parameters/Hammer/blend_position", input_movement)
        anim_tree.set("parameters/Jump/blend_position", input_movement)

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

func on_state_reset():
    current_state = hero_state.MOVE