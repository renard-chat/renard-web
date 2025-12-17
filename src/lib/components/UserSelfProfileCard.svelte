<script lang="ts">
	import IconButton from "$lib/components/IconButton.svelte";
</script>

<div class="flex p-2 items-center border-home-dark border rounded-2xl gap-2">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiKx95S8HtdbEh-i-vEenX1woknJMEVeNLRg&s" width="40px" height="40px" alt="Avatar" class="h-10 w-10 object-center object-cover rounded-lg">
  <div class="flex flex-col flex-1">
    <span class="font-bold text-home-lighter text-base">LolouTheFox</span>
    <span class="text-home-light text-xs font-mono">liam.cheneval@gmail.com</span>
  </div>
  <IconButton icon="dots-three"/>
</div>
