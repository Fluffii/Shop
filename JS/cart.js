var cart = {};
function loadCart() {
	if (localStorage.getItem('cart')){
		cart = JSON.parse(localStorage.getItem('cart'));
		showCart();
	}
	else {
		$('.main-cart').html('Корзина пуста')
	}
}

function showCart() {
	if (!isEmpty(cart)) {
			$('.main-cart').html('Корзина пуста');
		}
	else {
		$.getJSON('goods.json', function(data) {
			var goods = data;
			var out = '';
			for (var id in cart) {
				out +='<button data-id="'+id+'" class="del-goods">x</button>  ';
				out +='<img src="../Магазин/images/'+goods[id].img+'" alt="">';
				out +=' '+goods[id].name+'  ';
				out +='  <button data-id="'+id+'" class="minus-goods">-</button> ';
				out +=' '+cart[id]+'  ';
				out +='  <button data-id="'+id+'" class="plus-goods">+</button>  ';
				out +=cart[id]*goods[id].cost;
				out +='<br>';
			}
			$('.main-cart').html(out);
			$('.del-goods').on('click', delGoods);
			$('.plus-goods').on('click', plusGoods);
			$('.minus-goods').on('click', minusGoods);
		});
	}
}

function delGoods() {
	var id = $(this).attr('data-id');
	delete cart[id];
	showCart();
	saveCart();
}

function plusGoods () {
	var id = $(this).attr('data-id');
	cart[id]++;
	showCart();
	saveCart();
}

function minusGoods () {
	var id = $(this).attr('data-id');
	if (cart[id]==1) {
		delete cart[id];
	}
	else {
		cart[id]--;
	}
	showCart();
	saveCart();
}

function saveCart () {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
	for (var key in object){
		if (object.hasOwnProperty(key)) {
			return true;
		}
		else {
			return false;
		}
	}
}

function sendEmail() {
	var ename = $('#ename').val();
	var email = $('#email').val();
	var ephone = $('#ephone').val();
	if (ename !='' && email !='' && ephone !='') {
		if(isEmpty(cart)){
			$.post(
				"../Магазин/core/mail.php",
				{
					"ename" : ename,
					"email" : email,
					"ephone" : ephone,
					"cart" : cart
				},
				function(data) {
					if(data == 1) {
						alert('Заказ отправлен');
					}
					else {
						alert('Повторите заказ');
					}
				}
			);
		}
		else {
			alert('Корзина пустая');
		}
	}
	else {
		alert('Заполните поля'); //Изменить функцию на валидацию.
	}
}

$(document).ready(function() {
	loadCart();
	$('.send-email').on('click', sendEmail);
});
