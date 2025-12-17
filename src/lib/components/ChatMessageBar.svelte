<script lang="ts">
	import { onMount } from "svelte";
	import IconButton from "./IconButton.svelte";

  let {class: className = ""} = $props();
  let textarea = $state<HTMLTextAreaElement>();
  const maxLines = 6;
  const lineHeight = 24; // approximate line height in pixels
  const maxHeight = maxLines * lineHeight;

  const handleInput = () => {
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = textarea.scrollHeight;
      
      if (newHeight > maxHeight) {
        textarea.style.height = maxHeight + 'px';
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.height = newHeight + 'px';
        textarea.style.overflowY = 'hidden';
      }
    }
  };

  let textAreaValue = $state("");

  const handleTextAreaKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Let IconButton handle the send
    }
  };

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only focus if no modifier keys except shift, and it's a printable character
      if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
        if (textarea && document.activeElement !== textarea) {
          textarea.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>
<div class="p-2 m-4 bg-home-darker flex items-center rounded-[25px] shadow-lg min-h-12.5 {className}">
  <IconButton icon="plus-circle" shortcut="ctrl+q"/>
  <textarea bind:value={textAreaValue} bind:this={textarea} oninput={handleInput} onkeydown={handleTextAreaKeyDown} placeholder="Write a message..." class="flex-1 p-0 pl-4 pr-4 bg-transparent text-home-lighter border-transparent focus:border-transparent focus:ring-0 text-base placeholder:text-home-light resize-none overflow-hidden" rows="1"></textarea>
  <div class="flex gap-1">
    <IconButton icon={textAreaValue ? "smiley" : "sticker"} shortcut="ctrl+s"/>
    <IconButton icon="paper-plane-tilt" primary disabled={!textAreaValue} shortcut="enter"/>
  </div>
</div>
