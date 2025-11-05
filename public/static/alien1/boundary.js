/**
 * Boundary 클래스: Matter.js를 사용하여 물리 월드의 움직이지 않는 경계(벽)를 정의합니다.
 */
class Boundary {
    constructor(x, y, w, h, angle = 0) {
        this.w = w; // 너비
        this.h = h; // 높이
        
        // Matter.js 물리 객체 설정
        let options = {
            isStatic: true, // ***** 중요: 이 객체가 움직이지 않도록 고정합니다. *****
            friction: 0.1,  // 마찰력
            angle: angle    // 회전 각도 (선택 사항)
        };
        
        // Matter.js의 사각형(Rectangle) 물리 객체 생성
        // Bodies.rectangle(x 위치, y 위치, 너비, 높이, 옵션)
        this.body = Matter.Bodies.rectangle(x, y, w, h, options);
        
        // 생성 시, Matter.js 월드에 즉시 추가
        World.add(world, this.body);
    }

    /**
     * show(): p5.js를 사용하여 경계를 화면에 그립니다.
     */
    show() {
        // sketch.js의 drawBody 함수를 사용하여 그립니다.
        // 경계는 배경과 동일하게 검은색 또는 어두운 색으로 처리하여 숨기거나,
        // 디버깅 목적으로만 보이게 할 수 있습니다.
        
        // 경계가 보이지 않게 처리 (배경과 같은 색상 사용)
        /*
        let pos = this.body.position;
        let angle = this.body.angle;
        
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        
        fill(50); // 어두운 회색으로 채워서 경계가 있다는 것을 시각화 (선택 사항)
        rect(0, 0, this.w, this.h);
        
        pop();
        */
        
        // 현재는 drawBody 함수를 사용하여 그릴 수도 있지만, 
        // 경계는 시각적으로 중요하지 않으므로 위 코드는 주석 처리하고
        // sketch.js의 draw 루프에서 이 부분은 최소한으로 처리하는 것이 좋습니다.
        
        // 디버깅 목적으로는 drawBody(this.body);를 사용할 수 있습니다.
        // drawBody(this.body); 
    }
}