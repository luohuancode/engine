import { Vec3 } from '@base/math';
import { physics } from '../../exports/physics-framework';
import { Node } from '../../cocos/scene-graph';
import { director } from '../../cocos/game';
import { PhysicsTestEnv } from './physics.test';

/**
 * This function is used to test the behavior of different volume ratios
 */
export default function (env: PhysicsTestEnv) {
    test(`Volume`, () => {
        const { rootNode: parent } = env;

        const steps = 120, ratios = 0.2;
    
        const nodeStatic = new Node('StaticB');
        parent.addChild(nodeStatic);
        nodeStatic.addComponent(physics.BoxCollider);
        nodeStatic.worldScale = new Vec3(20, 0.01, 20);
        nodeStatic.worldPosition = new Vec3(0, -0.005, 0);

        const high = new Node('high');
        parent.addChild(high);
        const highBody = high.addComponent(physics.RigidBody) as physics.RigidBody;
        high.addComponent(physics.BoxCollider);
        const initPos = new Vec3(0, 0.5 + ratios, 0);
        high.worldPosition = initPos;

        const low = new Node('low');
        parent.addChild(low);
        low.addComponent(physics.RigidBody);
        low.addComponent(physics.BoxCollider);
        low.worldScale = new Vec3(ratios, ratios, ratios);
        low.worldPosition = new Vec3(0, ratios / 2, 0);

        const dt = physics.PhysicsSystem.instance.fixedTimeStep;
        for (let i = 0; i < steps; i++) {
            director.tick(dt);
        }

        expect(high.worldPosition.equals(initPos, 0.01)).toBe(true);
    });
}
