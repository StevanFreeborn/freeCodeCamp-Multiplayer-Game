import Player from '../game/player.mjs';
import Collectible from '../game/collectible.mjs';
import chai from 'chai';
const assert = chai.assert;
import { JSDOM } from 'jsdom';

suite('Unit Tests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {

        global.window = dom.window;
        global.document = dom.window.document;
      });
  });

  suite('Collectible class', () => {
    test('Collectible class generates a collectible item object.', done => {
      const testItem = new Collectible({ x: 100, y: 100, id: Date.now() });

      assert.isObject(testItem);
      done();
    });

    test('Collectible item object contains x and y coordinates and a unique id.', done => {
      const testItem = new Collectible({ x: 100, y: 100, id: Date.now() });

      assert.typeOf(testItem.x, 'Number');
      assert.typeOf(testItem.y, 'Number');
      assert.exists(testItem.id);
      done();
    });
  });

  suite('Player class', () => {
    test('Player class generates a player object.', done => {
      const testPlayer = new Player(Date.now(), { x: 100, y: 100 });

      assert.isObject(testPlayer);
      done();
    });

    test('Player object contains a score, x and y coordinates, and a unique id.', done => {
      const testPlayer = new Player(Date.now(), { x: 100, y: 100 });

      assert.typeOf(testPlayer.x, 'Number');
      assert.typeOf(testPlayer.y, 'Number');
      assert.typeOf(testPlayer.score, 'Number');
      assert.exists(testPlayer.id);
      done();
    });

    test("move() adjusts a player's position.", done => {
      // Note: Only testing movement along the x axis in case
      // the game is a 2D platformer
      const testPlayer = new Player(Date.now(), { x: 100, y: 100 });

      testPlayer.velocity = { x: 1, y: 0 };
      testPlayer.move();
      const testPos1 = { x: testPlayer.x, y: testPlayer.y }
      const expectedPos1 = { x: 101, y: 100 }

      testPlayer.velocity = { x: -1, y: 0 };
      testPlayer.move();
      const testPos2 = { x: testPlayer.x, y: testPlayer.y }
      const expectedPos2 = { x: 100, y: 100 }

      assert.deepEqual(testPos1, expectedPos1);
      assert.deepEqual(testPos2, expectedPos2);      
      done();
    });
  });
});
