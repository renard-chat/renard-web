<script lang="ts">
	import { goto } from "$app/navigation";
	import IconButton from "$lib/components/IconButton.svelte";

  let {user} = $props()
</script>

<div class="flex p-2 items-center border-home-dark border rounded-2xl gap-2">
  <img src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed={user.id}" width="40px" height="40px" alt="Avatar" class="h-10 w-10 object-center object-cover rounded-lg">
  <div class="flex flex-col flex-1">
    <span class="font-bold text-home-lighter text-base">{user.username}</span>
    <span class="text-home-light text-xs font-mono">{user.email}</span>
  </div>
  <IconButton icon="door-open" onclick={()=>{
    goto("/auth/logout");
  }}/>
</div>
