<?php
	$json = file_get_contents(filename: '../goods.json');
	$json = json_decode($json);

	$message = '';
	$message .= '<h1>Заказ в магазина</h1>';
	$message .= '<p>Телефон: '.$_POST['ephone'].'</p>';
	$message .= '<p>Почта: '.$_POST['email'].'</p>';
	$message .= '<p>Имя: '.$_POST['ename'].'</p>';

	$cart = $_POST['cart'];
	$sum = 0;
	foreach ($cart as $id => $count) {
		$message .= $json[$id]['name'].' --- ';
		$message .= $count.' --- ';
		$message .= $count*$json[$id]['cost'];
		$message .= '<br>';
		$sum = $sum + $count*$json[$id]['cost'];
	}
	$message .= 'Всего: '.$sum;
	print_r($message);

	$to = 'nikolaeva002@gmail.com'.',';
	$to .= $_POST['email'];
	$spectext = '<!DOCTYPE html><html><head><title></title></head><body>';
	$headers = 'MIME-Version: 1.0' . "r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "r\n";

	$m = mail($to, 'Заказ в магазине', $spectext.$message.'</body></html>', $headers);
	if ($m)
	{
		echo 1;
	}
	else {
		echo 0;
	}
?>
