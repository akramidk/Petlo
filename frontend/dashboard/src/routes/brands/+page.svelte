<script lang="ts">
	import RequestOptions from '$lib/components/RequestOptions.svelte';

	let data = {
		en_name: '',
		ar_name: ''
	};
</script>

<RequestOptions bind:data method="POST" actionName="brands" />
<input
	bind:value={data.en_name}
	required
	type="text"
	placeholder="English name"
	class="input input-bordered w-full max-w-xs"
/>
<input
	bind:value={data.ar_name}
	required
	type="text"
	placeholder="Arabic name"
	class="input input-bordered w-full max-w-xs"
/>
