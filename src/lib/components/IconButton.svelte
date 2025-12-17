<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "./Icon.svelte";
  let {icon, primary = false, onclick, shortcut, disabled}: {icon:string, primary?: boolean, onclick?: ()=>void, shortcut?: string, disabled?: boolean} = $props();
  
  let isSquished = $state(false);

  const squish = () => {
    if (disabled) return;
    isSquished = true;
    if (onclick) onclick();
    setTimeout(() => isSquished = false, 100);
  };

  onMount(() => {
    if (!shortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = shortcut.toLowerCase().split('+');
      const needsCtrl = keys.includes('ctrl');
      const needsAlt = keys.includes('alt');
      const needsShift = keys.includes('shift');
      const key = keys[keys.length - 1];

      if (
        e.key.toLowerCase() === key &&
        e.ctrlKey === needsCtrl &&
        e.altKey === needsAlt &&
        e.shiftKey === needsShift
      ) {
        e.preventDefault();
        squish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>
<button {onclick} {disabled}
  style="transition: padding 250ms var(--ease-bounce), transform 250ms var(--ease-bounce), filter 200ms ease-in-out, opacity 200ms ease-in-out;"
  class="flex items-center justify-center w-fit rounded-full pt-2 pb-2 disabled:grayscale disabled:opacity-50" 
  class:pl-4={!isSquished} class:pr-4={!isSquished}
  class:pl-5={isSquished} class:pr-5={isSquished} class:scale-95={isSquished}
  class:bg-home-dark={!primary} class:bg-home-lighter={primary}
  class:active:pl-5={!isSquished} class:active:pr-5={!isSquished} class:active:scale-95={!isSquished}>
  <Icon {icon} class={primary ? "text-home-darker" : "text-home-lighter"} />
</button>
