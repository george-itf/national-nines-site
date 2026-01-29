const m=document.getElementById("empty-cart"),u=document.getElementById("cart-content"),g=document.getElementById("cart-items"),h=document.getElementById("cart-subtotal"),p=document.getElementById("checkout-btn"),x=document.getElementById("clear-cart"),r=document.getElementById("checkout-modal"),I=document.getElementById("cancel-checkout"),y=document.getElementById("checkout-form"),f=document.querySelector('select[name="delivery"]'),v=document.getElementById("address-fields"),S=document.getElementById("order-confirmation");function l(){const n=JSON.parse(localStorage.getItem("cart")||"[]");if(n.length===0){m?.classList.remove("hidden"),u?.classList.add("hidden");return}m?.classList.add("hidden"),u?.classList.remove("hidden");let t="",e=0;n.forEach((o,a)=>{const d=o.price*o.quantity;e+=d,t+=`
        <div class="p-4 flex items-center gap-4">
          <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="font-semibold">${o.name}</h3>
            <p class="text-brand-red font-bold">£${o.price}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="qty-btn w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100" data-index="${a}" data-action="decrease">-</button>
            <span class="w-8 text-center">${o.quantity}</span>
            <button class="qty-btn w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100" data-index="${a}" data-action="increase">+</button>
          </div>
          <div class="w-20 text-right font-semibold">£${d.toFixed(2)}</div>
          <button class="remove-btn text-gray-400 hover:text-red-600" data-index="${a}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      `}),g&&(g.innerHTML=t),h&&(h.textContent=`£${e.toFixed(2)}`);const c=document.getElementById("modal-subtotal"),s=document.getElementById("modal-total");c&&(c.textContent=`£${e.toFixed(2)}`),s&&(s.textContent=`£${e.toFixed(2)}`),document.querySelectorAll(".qty-btn").forEach(o=>{o.addEventListener("click",()=>{const a=parseInt(o.dataset.index||"0"),d=o.dataset.action;E(a,d)})}),document.querySelectorAll(".remove-btn").forEach(o=>{o.addEventListener("click",()=>{const a=parseInt(o.dataset.index||"0");L(a)})})}function E(n,t){const e=JSON.parse(localStorage.getItem("cart")||"[]");t==="increase"?e[n].quantity++:t==="decrease"&&(e[n].quantity--,e[n].quantity<=0&&e.splice(n,1)),localStorage.setItem("cart",JSON.stringify(e)),i(),l()}function L(n){const t=JSON.parse(localStorage.getItem("cart")||"[]");t.splice(n,1),localStorage.setItem("cart",JSON.stringify(t)),i(),l()}function i(){const n=JSON.parse(localStorage.getItem("cart")||"[]"),t=document.getElementById("cart-count");if(t){const e=n.reduce((c,s)=>c+s.quantity,0);t.textContent=e.toString(),t.classList.toggle("hidden",e===0)}}x?.addEventListener("click",()=>{confirm("Clear all items from your cart?")&&(localStorage.removeItem("cart"),i(),l())});p?.addEventListener("click",()=>{r?.classList.remove("hidden"),r?.classList.add("flex")});I?.addEventListener("click",()=>{r?.classList.add("hidden"),r?.classList.remove("flex")});f?.addEventListener("change",()=>{const n=f.value==="shipping";v?.classList.toggle("hidden",!n);const t=document.getElementById("modal-shipping");t&&(t.textContent=n?"£5-15":"Free"),v?.querySelectorAll("input").forEach(e=>{e.required=n})});y?.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(y),e=JSON.parse(localStorage.getItem("cart")||"[]"),c={customer:{name:t.get("name"),email:t.get("email"),phone:t.get("phone"),delivery:t.get("delivery"),address:t.get("address"),city:t.get("city"),postcode:t.get("postcode"),notes:t.get("notes")},items:e,total:e.reduce((s,o)=>s+o.price*o.quantity,0),date:new Date().toISOString()};console.log("Order submitted:",c),localStorage.removeItem("cart"),i(),r?.classList.add("hidden"),u?.classList.add("hidden"),m?.classList.add("hidden"),S?.classList.remove("hidden")});l();
