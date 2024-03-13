<template>
  <div class="text-lg col-start-1 col-span-2 md:row-start-1 mb-3">
    <span class="bi-globe mr-2"></span>Web Service
  </div>
  <div
    class="grid md:grid-cols-2 md:grid-component-details grid-cols-1 h-full gap-4"
  >
    <div class="mt-1 gap-2 col-start-1 flex flex-wrap h-fit">
      <div class="grow text-sm grid grid-cols-2 gap-y-4">
        <div class="text-gray-500">Last activity:</div>
        <div class="">3 days ago</div>
        <div class="text-gray-500">External Ip:</div>
        <div class="">192.168.1.50</div>
        <div class="text-gray-500">Image:</div>
        <div class="">nginx/nginx:latest</div>
        <div class="text-gray-500">Addresses:</div>
        <ul>
          <li class="">http://192.168.1.50:8010</li>
          <li class="">https://192.168.1.50:8010</li>
        </ul>
      </div>
      <div class="grow text-sm grid grid-cols-2 gap-y-4">
        <div class="text-gray-500">Creation time:</div>
        <div class="">4 days ago</div>
        <div class="text-gray-500">Status:</div>
        <div class="">Active</div>
        <div class="text-gray-500">Ports:</div>
        <ul>
          <li>8010 TCP</li>
          <li>9010 TCP</li>
        </ul>
      </div>
    </div>
    <div class="md:col-start-2 grid grid-cols-2 text-sm h-fit gap-y-4">
      <div class="text-gray-500">CPU:</div>
      <div class="">
        <input
          class="py-2 px-2 rounded-md bg-transparent border border-color w-14 text-center"
        />
      </div>
      <div class="text-gray-500">Memory:</div>
      <div class="">
        <input
          class="py-2 px-2 rounded-md bg-transparent border border-color w-14 text-center"
        />
      </div>
      <div class="text-gray-500">Replicas:</div>
      <div class="">
        <input
          class="py-2 px-2 rounded-md bg-transparent border border-color w-14 text-center"
        />
      </div>
    </div>
    <div class="bg-black md:row-start-2 col-start-1 md:col-span-2">
      asdasdasd
    </div>
  </div>
</template>
