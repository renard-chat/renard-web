<script lang="ts">
	import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();
  let tab = $state(0)
</script>

<form method="POST" action={tab === 0 ? '?/login' : '?/register'}>
  <div>
    <button type="button" disabled={tab === 0} onclick={() => {tab = 0}}>Login</button>
    <button type="button" disabled={tab === 1} onclick={() => {tab = 1}}>Register</button>
  </div>
  
  {#if form?.message}
    <div class="bg-red-50 border border-red-200 rounded px-4 py-3 text-red-700 mb-4">
      {form.message}
    </div>
  {/if}
  
  <input type="text" placeholder="Email" name="email">
  <input type="password" placeholder="Password" name="password">
  {#if tab === 1}
    <input type="password" placeholder="Confirm Password" name="confirmPassword">    
    <input type="text" placeholder="Username" name="username">
  {/if}
  {#if tab === 1}
    <button type="submit">Register</button>
  {:else}
    <button type="submit">Login</button>
  {/if}
</form>
