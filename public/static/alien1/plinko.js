// Plinko 핀의 공통 반지름 (Particle보다 약간 작거나 비슷한 크기)
const PLINKO_RADIUS = 3; 

/**
 * Plinko 클래스: Matter.js를 사용하여 물리 월드의 정적인 원형 핀을 정의합니다.
 */
class Plinko {
    constructor(x, y, r = PLINKO_RADIUS) {
        this.r = r; // 반지름
        
        // Matter.js 물리 객체 설정
        let options = {
            isStatic: true,      // ***** 중요: 핀은 움직이지 않도록 고정합니다. *****
            restitution: 0.9,    // 탄성: 입자를 잘 튕겨내도록 높게 설정
            friction: 0,         // 마찰력: 마찰을 최소화하여 입자가 부드럽게 미끄러지도록 함
            label: 'plinko'
        };
        
        // Matter.js의 원형(Circle) 물리 객체 생성
        // Bodies.circle(x 위치, y 위치, 반지름, 옵션)
        this.body = Matter.Bodies.circle(x, y, r, options);
        
        // 생성 시, Matter.js 월드에 즉시 추가
        // World.add(world, this.body); // 주석 처리: sketch.js에서 일괄 추가할 것임
    }

    /**
     * show(): p5.js를 사용하여 핀을 화면에 그립니다.
     */
    show() {
        let pos = this.body.position;
        
        push(); // p5.js 그리기 상태 저장
        
        translate(pos.x, pos.y);
        
        // 핀은 어둡게 또는 회색으로 그려 입자와 대비되게 합니다.
        noStroke();
        fill(50); 
        
        // 둥근 핀 그리기
        ellipse(0, 0, this.r * 2); 
        
        pop(); // p5.js 그리기 상태 복원
    }
}