namespace SpriteKind {
    export const powerup = SpriteKind.create()
}
function enemy_death (enemy: Sprite) {
    enemy.destroy(effects.fire, 500)
    if (Math.percentChance(30)) {
        power_up = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . 8 8 6 6 6 6 6 6 6 8 8 . . . 
            . 8 6 6 6 6 6 6 6 6 6 6 6 8 . . 
            . 8 6 6 7 7 7 7 7 7 7 6 6 8 . . 
            8 6 6 7 7 7 7 7 7 7 7 7 6 6 8 . 
            8 6 6 7 7 7 . . . 7 7 7 6 6 8 . 
            8 6 6 7 7 . . . . . 7 7 6 6 8 . 
            8 6 6 7 7 . . . . . 7 7 6 6 8 . 
            8 6 6 7 7 . . . . . 7 7 6 6 8 . 
            8 6 6 7 7 7 . . . 7 7 7 6 6 8 . 
            8 6 6 7 7 7 7 7 7 7 7 7 6 6 8 . 
            . 8 6 6 7 7 7 7 7 7 7 6 6 8 . . 
            . 8 6 6 6 6 6 6 6 6 6 6 6 8 . . 
            . . 8 8 6 6 6 6 6 6 6 8 8 . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            `, SpriteKind.powerup)
        power_up.x = enemy.x
        power_up.y = enemy.y
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . 9 9 9 9 9 9 9 . . . . 
        . 9 9 9 9 9 9 9 9 9 9 9 . . . . 
        . . . . . . 9 9 9 9 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    if (_2fire) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 2 2 2 2 . . . 
            . . . . . . 3 2 2 3 2 2 2 . . . 
            . . 1 1 1 1 3 3 3 3 3 3 2 . . . 
            . . . . . . . 3 3 3 3 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 3 3 3 2 . . . . . 
            . . 1 1 3 3 2 3 3 3 3 3 2 . . . 
            . . . . . . 3 3 2 3 2 2 2 . . . 
            . . . . . . . . . 2 2 2 2 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 200, 0)
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemy_death(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup, function (sprite, otherSprite) {
    _2fire = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . 3 2 2 3 2 2 2 . . . 
        . . 1 1 1 1 3 3 3 3 3 3 2 . . . 
        . . . . . . . 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 3 3 2 . . . . . 
        . . 1 1 3 3 2 3 3 3 3 3 2 . . . 
        . . . . . . 3 3 2 3 2 2 2 . . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    _2fire.setPosition(40, 5)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemy_death(otherSprite)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let statusbar: StatusBarSprite = null
let boomboom: Sprite = null
let _2fire: Sprite = null
let projectile: Sprite = null
let power_up: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . f f f f f f f f f . . . . . . 
    f c c b b b b b d d f f . . . . 
    f c c c b b b b d d 1 1 f . . . 
    f c c c b b b d d 1 f f . . . . 
    . f f f f f f d d f f . . . . . 
    . . . . . . f f d d f f . . . . 
    . . . . . . . f d d d 9 f . . . 
    . . . . . . f d d d d 9 f . . . 
    . . . . . . f d d d d 9 f . . . 
    . . . . . . . f d d d 9 f . . . 
    . . . . . . f f d d f f . . . . 
    . f f f f f f d d f f . . . . . 
    f c c b b b d d d 1 f f . . . . 
    f c c b b b b d d d 1 1 f . . . 
    f c c b b b b b b d f f . . . . 
    . f f f f f f f f f . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(2000, function () {
    boomboom = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . f f f 
        . . . . . . . . . . . f f 2 2 2 
        . . . . . . . . . f f 2 2 2 2 f 
        . . . . . . . . f 4 2 4 4 f f . 
        . . . f f f f f 4 4 4 4 f f f . 
        . f f 5 5 4 f 5 5 4 4 f 2 2 2 f 
        f 5 5 5 4 4 f f f f f f 4 2 2 f 
        . f f f f f f f 5 5 4 4 f f f . 
        . . . . . . . . f 2 2 2 4 f f . 
        . . . . . . . . . f f 2 2 2 2 f 
        . . . . . . . . . . . f f 2 2 2 
        . . . . . . . . . . . . . f f f 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    boomboom.x = scene.screenWidth()
    boomboom.vx = -20
    boomboom.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(boomboom)
})
