<?php


$p = array();


$parts = findParts($_POST['num_boxes'],$_POST['sum']);

foreach($parts as $part){
	$string = trim(implode("",$part));
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
echo json_encode(["parts"=>$possibles,"sums"=>$parts]);
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


function findParts($boxes,$sum){
	$digits = "123456789";


	$start   = substr($digits, 0, $boxes);
	$end     = strrev(substr($digits, -$boxes));
	$sums    = [];
	$notsums = [];

	for ($i = $start; $i <= $end; $i++) {
		if (false !== stripos($i, "0")) {
			continue;
		}
		$parts = str_split($i);
		if(count(array_unique($parts)) != count($parts)){
			continue;
		}
		sort($parts);
		if (!in_array($parts, $sums) && !in_array($parts, $notsums)) {
			if (array_sum($parts) == $sum) {
				$sums[] = $parts;
			} else {
				$notsums = $parts;
			}
		}

	}
	return $sums;

}