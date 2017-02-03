<?php

$p = array();

$strings = preg_split('/\s+/', $_POST['strings']);
foreach($strings as $string){
	$string = trim($string);
	permutation("",$string);
}

$possibles = array();
$boxes = $_POST['boxes'];

foreach($p as $q){

	for($i=0;$i<count($q);$i++){
		$toCheck = $q[$i];
		$allowed = $boxes[$i];
		if(false === stripos($allowed,$toCheck)){
			continue 2;
		}
	}

	for ($i = 0; $i < count($q); $i++) {
		$possibles[$i][] = $q[$i];
	}
}

for($i=0;$i<count($possibles);$i++){
	$possibles[$i] = array_unique($possibles[$i]);
	sort($possibles[$i]);
	//$possibles[$i] = implode(" ",$possibles[$i]);
}

header("content-type: application/json");
echo json_encode($possibles);
exit;





function permutation($prefix, $str)
{
	global $p;
	$n = strlen($str);
	if ($n == 0) {
		$p[] = str_split($prefix);
	} else {
		for ($i = 0; $i < $n; $i++) {
			permutation($prefix . $str[$i], substr($str, 0, $i) . substr($str, $i + 1));
		}
	}

}
