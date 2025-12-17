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

    let cancelTimer: number | null = null;
    let isCancelled = false;
    let isKeyDown = false;

    const matchesShortcut = (e: KeyboardEvent) => {
      const keys = shortcut.toLowerCase().split('+');
      const needsCtrl = keys.includes('ctrl');
      const needsAlt = keys.includes('alt');
      const needsShift = keys.includes('shift');
      const key = keys[keys.length - 1];

      return (
        e.key.toLowerCase() === key &&
        e.ctrlKey === needsCtrl &&
        e.altKey === needsAlt &&
        e.shiftKey === needsShift
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (matchesShortcut(e) && !disabled && !isKeyDown) {
        e.preventDefault();
        isKeyDown = true;
        isSquished = true;
        isCancelled = false;
        
        // Start cancel timer
        cancelTimer = window.setTimeout(() => {
          isSquished = false;
          isCancelled = true;
          cancelTimer = null;
        }, 1000);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (matchesShortcut(e) && !disabled && isKeyDown) {
        e.preventDefault();
        isKeyDown = false;
        
        // Clear cancel timer if still running
        if (cancelTimer !== null) {
          clearTimeout(cancelTimer);
          cancelTimer = null;
        }
        
        isSquished = false;
        
        // Only trigger onclick if not cancelled
        if (!isCancelled && onclick) {
          onclick();
        }
        
        isCancelled = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      if (cancelTimer !== null) {
        clearTimeout(cancelTimer);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
</script>
<button {onclick} {disabled}
  style="transition: padding 250ms var(--ease-bounce), transform 250ms var(--ease-bounce), filter 200ms ease-in-out, opacity 200ms ease-in-out;"
  class="flex items-center justify-center w-fit rounded-full pt-2 pb-2 disabled:grayscale disabled:opacity-50" 
  class:pl-4={!isSquished} class:pr-4={!isSquished}
  class:pl-5={isSquished} class:pr-5={isSquished} class:scale-95={isSquished}
  class:bg-home-dark={!primary} class:bg-home-lighter={primary}
  class:active:pl-5={!isSquished && !disabled} class:active:pr-5={!isSquished && !disabled} class:active:scale-95={!isSquished && !disabled}>
  <Icon {icon} class={primary ? "text-home-darker" : "text-home-lighter"} />
</button>
