import echarts from 'echarts';

export default {
    bind: (el) => {
        el.resizeEventHandler = () => el.echartsInstance.resize();

        if ( window.attachEvent ) {
            window.attachEvent('onresize', el.resizeEventHandler);
        } else {
            window.addEventListener('resize', el.resizeEventHandler, false);
        }
    },

    inserted: (el) => {
        el.echartsInstance = echarts.init(el);
    },

    update: (el, binding) => {
        el.echartsInstance.setOption(binding.value);
    },

    unbind: (el) => {
        if ( window.attachEvent ) {
            window.detachEvent('onresize', _this.resizeEventHandler);
        } else {
            window.removeEventListener('resize', _this.resizeEventHandler, false);
        }

        el.echartsInstance.dispose();
    }
}
