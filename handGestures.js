AFRAME.registerComponent("controller", {
    init: function () {
        this.modelVisible = false;
        // track markerFound/markerLost
        this.el.addEventListener("markerFound", () => this.modelVisible = true);
        this.el.addEventListener("markerLost", () => this.modelVisible = false);
        // grab the model reference
        document.querySelector("[gltf-model]").addEventListener("model-loaded", evt => {
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);

        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        hammertime.on("panleft", () => {
            if (!this.modelVisible) return;
            this.isPanning = true
            this.mesh.rotation.y -= 4 * Math.PI / 360;
        })
       
        hammertime.on("panright", () => {
            if (!this.modelVisible) return;
            this.isPanning = true
            this.mesh.rotation.y += 4 * Math.PI / 360;
        })
        hammertime.on("panend", () => this.isPanning = false)
        hammertime.on("pancancel", () => this.isPanning = false)

        hammertime.on("swipeleft",  ({velocity}) => {
            if (!this.modelVisible) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({velocity}) => {
            if (!this.modelVisible) return;
            this.swipeVelocity = velocity
        })
    },
    tick: function() {
        if (!(this.modelVisible && this.swipeVelocity &&!this.isPanning)) return;
        this.mesh.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
        this.swipeVelocity *= 0.93;
        if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
    }
})