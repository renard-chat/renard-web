<script lang="ts">
	import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();
  let tab = $state(0)
</script>

<div class="flex items-start justify-center h-screen p-8">
  <form method="POST" action={tab === 0 ? '?/login' : '?/register'} class="flex flex-col gap-4 text-home-lighter bg-home-dark p-4 rounded-2xl">
    <div class="flex gap-1 p-2 justify-center rounded-full bg-home-darker">
      <button type="button" disabled={tab === 0} onclick={() => {tab = 0}} class="rounded-full p-4 pt-2 pb-2 flex-1 disabled:text-home-darker disabled:bg-home-lighter text-home-light">Login</button>
      <button type="button" disabled={tab === 1} onclick={() => {tab = 1}} class="rounded-full p-4 pt-2 pb-2 flex-1 disabled:text-home-darker disabled:bg-home-lighter text-home-light">Register</button>
    </div>

    <div class="flex flex-col gap-2">
      <input type="text" placeholder="Email" name="email" class="bg-home-darker border-none rounded-full ring-0 placeholder:text-home-light p-4 pt-2 pb-2">
      <input type="password" placeholder="Password" name="password" class="bg-home-darker border-none rounded-full ring-0 placeholder:text-home-light p-4 pt-2 pb-2">
    
      {#if tab === 1}
        <input type="password" placeholder="Confirm Password" name="confirmPassword" class="bg-home-darker border-none rounded-full ring-0 placeholder:text-home-light p-4 pt-2 pb-2" >
        <input type="text" placeholder="Username" name="username" class="bg-home-darker border-none rounded-full ring-0 placeholder:text-home-light p-4 pt-2 pb-2">
      {/if}
    </div>
    {#if tab === 1}
      <button type="submit">Register</button>
    {:else}
      <button type="submit">Login</button>
    {/if}

    {#if form?.message}
      <div class="bg-red-700 rounded-md px-4 py-3 text-red-50">
        {form.message}
      </div>
    {/if}
  </form>

</div>
