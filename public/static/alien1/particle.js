/**
 * Particle 클래스: 타이핑 시 생성되어 물리 엔진의 영향을 받는 입자(작은 공)를 정의합니다.
 */
class Particle {
    constructor(x, y, r) {
        // Matter.js 관련 설정
        this.r = r; // 반지름
        let options = {
            restitution: 0.7, // 탄성 (튕기는 정도): 0.7은 잘 튕긴다는 의미
            friction: 0.01,   // 마찰력
            density: 1        // 밀도
        };
        
        // Matter.js의 원형(Circle) 물리 객체 생성
        // Bodies.circle(x 위치, y 위치, 반지름, 옵션)
        this.body = Matter.Bodies.circle(x, y, r, options);
        
        // 생성 시, Matter.js 월드에 즉시 추가 (sketch.js의 keyPressed에서 실행)
        // World.add(world, this.body); // 주석 처리: sketch.js에서 직접 추가할 것임

        // p5.js 그리기 관련 속성 (선택 사항)
        this.color = 255; // 흰색
    }

    /**
     * isOffScreen(): 입자가 화면 밖으로 완전히 떨어졌는지 확인합니다.
     * (sketch.js의 draw 루프에서 성능 최적화를 위해 사용됩니다.)
     */
    isOffScreen() {
        let x = this.body.position.x;
        let y = this.body.position.y;
        
        // 캔버스 크기(600x800)보다 y축으로 한참 아래에 있거나 x축 밖으로 나갔을 때
        return (x < -50 || x > width + 50 || y > height + 50);
    }

    /**
     * show(): p5.js를 사용하여 입자를 화면에 그립니다.
     */
    show() {
        // Matter.js 객체의 현재 위치와 각도를 가져옵니다.
        let pos = this.body.position;
        let angle = this.body.angle;
        
        push(); // p5.js 그리기 상태 저장
        
        translate(pos.x, pos.y);
        rotate(angle);
        
        // 광채 효과 시뮬레이션 (Radiance Cascades 라이브러리 미사용 시 임시 효과)
        noStroke();
        
        // 흰색으로 채우기 (이미지에서 본 '전구' 효과)
        fill(this.color, 255, 255); 
        
        // 둥근 입자 그리기
        ellipse(0, 0, this.r * 2); 
        
        pop(); // p5.js 그리기 상태 복원
    }
}