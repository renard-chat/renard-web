<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "./Icon.svelte";

  let {chats, activeChat = $bindable(0)} = $props();
  let keyboardBounce = $state(-1);

    
  onMount(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      const newActive = Math.max(0, activeChat - 1);
      if (newActive !== activeChat) {
        activeChat = newActive;
        keyboardBounce = newActive;
        setTimeout(() => keyboardBounce = -1, 100);
      }
    } else if (e.altKey && e.key === 'ArrowDown') {
     e.preventDefault();
        const newActive = Math.min(chats.length - 1, activeChat + 1);
        if (newActive !== activeChat) {
          activeChat = newActive;
          keyboardBounce = newActive;
          setTimeout(() => keyboardBounce = -1, 100);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })
</script>

<div class="flex flex-col gap-1">
  {#each chats as chat, i}
    <button class="group p-2 rounded-2xl flex gap-2 hover:bg-home-dark disabled:bg-home-dark duration-250 hover:ease-in-out active:ease-bounce text-left" disabled={activeChat == i} onclick={()=>{
      activeChat = i;
    }}>
      <img src={chat.profilePicture} alt="" class="size-10 rounded-lg group-active:w-12 group-active:scale-95 object-cover duration-250 ease-bounce" class:scale-95={keyboardBounce === i} class:w-12={keyboardBounce === i}>
      <div class="flex-1 flex flex-col justify-center">
        <span class="text-home-lighter text-xs font-bold">{chat.username}</span>
        <span class="text-home-light text-xs">{chat.lastMessage}</span>
      </div>
      <div class="flex flex-col items-end justify-between">
        <span class="text-xs text-home-lighter">{chat.lastSpoke}</span>
        {#if chat.unreadCount > 0}
          <span class="size-4 flex items-center justify-center font-bold bg-home-accent text-home-darker rounded-full text-[10px]">{chat.unreadCount}</span>
        {:else}
          <Icon icon={chat.received ? (chat.read ? "checks" : "check") : "clock"} class="text-home-light"/>
        {/if}
      </div>
    </button>
  {/each}
</div>
