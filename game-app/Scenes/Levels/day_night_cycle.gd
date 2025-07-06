extends CanvasModulate

@export var gradient: GradientTexture1D
var time: float = 0.0


func _process(delta: float) -> void:
    time += delta * 0.1
    var value = (sin(time - PI / 2) + 1.0) / 2.0
    self.color = gradient.gradient.sample(value)