const assert = require('assert')

class Car {
    park() {
        return 'stopped'
    }

    drive() {
        return 'vroom'
    }
}

describe('Car', () => {
    let car;

    beforeEach(() => {
        car = new Car()
        console.log('Inside "beforeEach"')
    })

    it('can park', () => {
        assert.equal(car.park(), 'stopped')
    })

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom')
    })
})

