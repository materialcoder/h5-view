/**
 * 动画方法，将动画CSS加到元素上，返回Promise提供后续操作（将动画重置）
 * @param $el 当前执行动画的元素
 * @param animationList 动画列表
 * @param isDebug 
 * @param callback 
 */

export default async function runAnimation($el, animationList=[], isDebug, callback) {
  let playFn = function(animation) {
    return new Promise(resolve => {
      $el.style.animationName = animation.type
      $el.style.animationDuration = `${animation.duration}s`
      $el.style.animationIterationCount = animation.infinite ? (isDebug ? 1 : 'infinite') : animation.iterationCount
      $el.style.animationDelay = `${animation.delay}s`
      $el.style.animationFillMode = 'both'
      let resolveFn = function() {
        $el.removeEventListener('animationend', resolveFn, false)
        $el.addEventListener('animationcancel', resolveFn, false)
        resolve()
      }
      $el.addEventListener('animationend', resolveFn, false)
      $el.addEventListener('animationcancel', resolveFn, false)
    })
  }
  for (let i=0, len=animationList.length; i<len;i++) {
    await playFn(animationList[i])
  }
  if (callback) {
    callback()
  }
}