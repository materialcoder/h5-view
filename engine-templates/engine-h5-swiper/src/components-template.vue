<template>
  <div class="quark-element-wrapper" @click="handleClick">
    <component :is="element.elName" class="quark-element" v-bind="element.propsValue"/>
  </div>
</template>

<script>
	import {regist_components_obj} from '@client/plugins/index'
	import runAnimations from '@client/common/js/runAnimations'
	// import elementEvents from '@client/mixins/elementEvents'

	export default {
		name: "components-template",
		components: {
			// 批量注册qk组件
			...regist_components_obj,
		},
		props: {
			element: {
				type: Object,
				require: true
			}
		},
		// mixins: [elementEvents],
		mounted() {
			let cssText = this.$el.style.cssText;
			let animations = this.element.animations || [];
			runAnimations(this.$el, animations, false, () => {
				this.$el.style.cssText = cssText
			})
		},
		methods: {
			async handleClick() {
				// this.$emit('handleElementClick', this.element.events, this.element)
			}
		}
	}
</script>
