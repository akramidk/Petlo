<script lang="ts">
	import RequestOptions from '$lib/components/RequestOptions.svelte';
	import { onMount } from 'svelte';
	import { Requests } from '$lib/utils';
	import type { DevEnv, Method } from '$lib/utils';

	let data = {
		barnd_public_id: '',
		categories: [''],
		en_name: '',
		ar_name: '',
		options: [
			{
				en_name: '',
				ar_name: '',
				weighted: false,
				values: [{ en: '', ar: '', unit: '' }]
			}
		],
		image: ''
	};

	let imageFile: HTMLInputElement;
	async function updateImage() {
		data.image = await readFile(imageFile.files[0]);
	}

	let devEnvironemt: DevEnv = 'dev';

	let currentCategories: { id: string; name: string; parent_id: string | null }[] = [];
	async function fetchCategories() {
		await Requests.makeAuthRequest(devEnvironemt, 'GET', 'categories')
			.then((resp) => resp.json())
			.then((data) => {
				currentCategories = data['data'];
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let currentBrands: { id: string; ar_name: string; en_name: string }[] = [];
	async function fetchBrands() {
		await Requests.makeAuthRequest(devEnvironemt, 'GET', 'brands')
			.then((resp) => resp.json())
			.then((data) => {
				currentBrands = data['data'];
			})
			.catch((err) => {
				console.error(err);
			});
	}

	async function fetchStuff() {
		await fetchCategories();
		await fetchBrands();
	}

	async function readFile(file: File): Promise<string | ArrayBuffer | null> {
		let res: string | ArrayBuffer | null = '';
		// 🙉🙊🙈 if it works it ain't stupid
		const toBase64 = () =>
			new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					resolve(reader.result);
					res = reader.result;
					return res;
				};
				reader.onerror = (err) => reject(err);
			});
		await toBase64();

		return res;
	}

	onMount(async () => {
		await fetchStuff();
	});
</script>

<RequestOptions
	bind:data
	method="POST"
	actionName="items"
	bind:devEnvironemt
	changeHandler={fetchStuff}
/>

<select class="select select-bordered w-full max-w-xs" bind:value={data.categories[0]}>
	<option disabled selected value={''}>Category</option>
	{#each currentCategories as category}
		<option value={category.id}>{category.name}</option>
	{/each}
</select>

<select class="select select-bordered w-full max-w-xs" bind:value={data.barnd_public_id}>
	<option disabled selected value={''}>Brand</option>
	{#each currentBrands as brand}
		<option value={brand.id}>{brand.en_name} - {brand.ar_name}</option>
	{/each}
</select>

<br />

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

<span class="block text-base-content text-2xl my-5">Image</span>
<input
	bind:this={imageFile}
	on:change={updateImage}
	accept=".gif,.jpg,.jpeg,.png"
	type="file"
	class="file-input file-input-bordered w-full max-w-xs"
/>

<br />

<span class="block text-base-content text-2xl my-5">Options</span>
<div class="ml-10">
	<button
		class="btn"
		on:click={() => {
			data.options.push({
				en_name: '',
				ar_name: '',
				weighted: false,
				values: [{ en: '', ar: '', unit: '' }]
			});
			data.options = data.options;
		}}>New option</button
	>
	{#each data.options as option, i}
		<span class="block text-base-content text-xl my-5">Option #{i + 1}</span>
		<button
			class="btn"
			on:click={() => {
				data.options.splice(i, 1);
				data.options = data.options;
			}}>Remove option</button
		>
		<br />

		<input
			bind:value={option.en_name}
			required
			type="text"
			placeholder="English name"
			class="input input-bordered w-full max-w-xs"
		/>

		<input
			bind:value={option.ar_name}
			required
			type="text"
			placeholder="Arabic name"
			class="input input-bordered w-full max-w-xs"
		/>

		<div class="form-control inline-block">
			<label class="label cursor-pointer">
				<span class="label-text text-xl">Weighted</span>
				<input type="checkbox" class="checkbox mx-1" bind:checked={option.weighted} />
			</label>
		</div>

		<div class="ml-10">
			<span class="block text-base-content text-2xl my-5">Values</span>
			<button
				class="btn"
				on:click={() => {
					option.values.push({ en: '', ar: '', unit: '' });
					option.values = option.values;
				}}>New value</button
			>
			{#each option.values as value, j}
				<span class="block text-base-content text-xl my-5">Value #{j + 1}</span>
				<input
					bind:value={value.en}
					required
					type="text"
					placeholder="English"
					class="input input-bordered w-full max-w-xs"
				/>
				<input
					bind:value={value.ar}
					required
					type="text"
					placeholder="Arabic"
					class="input input-bordered w-full max-w-xs"
				/>

				{#if option.weighted}
					<select class="select select-bordered w-full max-w-xs" bind:value={value.unit}>
						<option disabled selected value="">Unit</option>
						<option value="G">Gram</option>
						<option value="KG">Kilogram</option>
					</select>
				{/if}
				<button
					class="btn"
					on:click={() => {
						option.values.splice(j, 1);
						option.values = option.values;
					}}>Remove value</button
				>
			{/each}
		</div>
	{/each}
</div>
