#!/usr/bin/perl
use strict;
use warnings;
use Chart::Gnuplot;
use Data::Dumper qw(Dumper);
use Statistics::LineFit;
use Statistics::Distributions;

my @daysinmonth = (0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
my @quantile = (0.010, 0.025, 0.050,0.100,0.150, 0.200, 0.250, 0.300, 0.350, 0.400, 0.450, 0.500, 0.550, 0.600, 0.650, 0.700, 0.750, 0.800, 0.850, 0.900, 0.950, 0.975, 0.990);
#my @quantile = (0.025, 0.159, 0.5, 0.841, 0.975);
sub daycounts {
# Now days in month directly gives the number of days without +1.....
	my ($m, $d) = @_;
#	print("Here we have days $d, month $m\n");
#	print("days in month $m is $daysinmonth[$m]\n");
	my $days = 0;
	for(my $i=1; $i<$m; $i++) {
		$days += $daysinmonth[$i];
	}
	$days+=$d-1;
	return $days;
}

sub getmonth {
# Now days in month directly gives the number of days without +1.....
	my ($daycn) = @_; #this should be from Jan 1, 2020.
#	print("Here we have days $d, month $m\n");
#	print("days in month $m is $daysinmonth[$m]\n");
	my $month = 0;
	my $currentmonth = 1;
	my $currentdaycn = $daycn;
	while($currentdaycn>=0) {
		if($currentdaycn < $daysinmonth[$currentmonth]) {
			$month = $currentmonth;
			$currentdaycn -= $daysinmonth[$currentmonth];			
		}
		else {
			$currentdaycn -= $daysinmonth[$currentmonth];
			$currentmonth++;
		}
	
	}
	return $month;
	
}

sub fromdaystodate {
# Now days in month directly gives the number of days without +1.....
	my ($daycn) = @_; #this should be from Jan 1, 2020.
#	print("Here we have days $d, month $m\n");
#	print("days in month $m is $daysinmonth[$m]\n");
	my $month = 0;
	my $currentmonth = 1;
	my $currentdaycn = $daycn;
	while($currentdaycn>=0) {
		if($currentdaycn < $daysinmonth[$currentmonth]) {
			$month = $currentmonth;
			$currentdaycn -= $daysinmonth[$currentmonth];			
		}
		else {
			$currentdaycn -= $daysinmonth[$currentmonth];
			$currentmonth++;
		}
	
	}
	my $day = $daycn - daycounts($month,1) + 1;
	return ($month, $day);
	
}


#my %grades;
#$grades{"Foo Bar"}{Mathematics}   = 97;
#$grades{"Foo Bar"}{Literature}    = 67;
#$grades{"Peti Bar"}{Literature}   = 88;
#$grades{"Peti Bar"}{Mathematics}  = 82;
#$grades{"Peti Bar"}{Art}          = 99;
# 
#print Dumper \%grades;
#print "----------------\n";
 
#foreach my $name (sort keys %grades) {
#    foreach my $subject (keys %{ $grades{$name} }) {
#        print "$name, $subject: $grades{$name}{$subject}\n";
#    }
#}
#my $Daily;
my %data;
#reference date is 01/22, based on daily fatality
my $refm = 1;
my $refd = 22;
my $refy = 2020;

#mask day is 04/15
my $maskm = 4;
my $maskd = 15;

my $statelevel=1;

#daily fatality threshold
my $startingdaily = 5.5; #2.5 for states....
if($statelevel==1) {$startingdaily = 2.5;}

#days of fatality delay
#my $fatalitydelay = 20;

#time of interests
my $interestm = 7;

#store most hit counties
my @allstate;
my @allcounty;

#store every counties
my @everystate;
my @everycounty;

my $mobilitytype=0;
my $LastDayFatalityValue = 1050; #1100 before this is for COUNTIES
my $LastDayFatalityValueState = 1000;

my $mobilitystartingdate=24;
my $allshift=25;#25 days before!

my $datesback = 28*0;
#daily is the current - yesterday, meanning the data is at night
# ifnewmexico: Set it to be 1 to examine it. Set it to be 0 to hide it for website output
my $ifnewmexico=1;

#my $month = getmonth(daycounts(3,32));
#print("month is $month\n");
#exit;


open(Daily, "time_series_covid19_deaths_US.csv");
my $firstline = <Daily>;
my $cn=1;
my $allentryfatality=0;
while (<Daily>) {
	my $line = $_;

	chomp($line);
	my @rawdata = $line =~ m/("[^"]+"|[^,]+)(?:,\s*)?/g;
#	my @rawdata = split(',', $line);
	if($rawdata[7] =~ "US") {
		#print("There are $#rawdata elements read in $rawdata[6]\n");
		$data{$rawdata[6]}{$rawdata[5]}{Cum}=[];
		$data{$rawdata[6]}{$rawdata[5]}{Daily}=[];
		$data{$rawdata[6]}{$rawdata[5]}{DailyRA}=[];
		$data{$rawdata[6]}{$rawdata[5]}{CumMobility}=[];
		$data{$rawdata[6]}{$rawdata[5]}{AllCumMobility}=[]; #cum to the latest date!
		$data{$rawdata[6]}{$rawdata[5]}{StartingDay} = -1;
		$data{$rawdata[6]}{$rawdata[5]}{FatalityDelay} = 35;
		$data{$rawdata[6]}{$rawdata[5]}{Lat} = $rawdata[8];
		$data{$rawdata[6]}{$rawdata[5]}{Long} = $rawdata[9];
		$data{$rawdata[6]}{$rawdata[5]}{Population} = $rawdata[11];		
		$data{$rawdata[6]}{$rawdata[5]}{LastMobDay} = -1;
		$data{$rawdata[6]}{$rawdata[5]}{LastDayFatality} = $rawdata[$#rawdata];
		$data{$rawdata[6]}{$rawdata[5]}{FatalityLastDay} = $#rawdata-12;
		$allentryfatality += $rawdata[$#rawdata-1-$datesback];
		if(!defined($data{$rawdata[6]}{'ALLSTATE'}{DailyRA})) {
			$data{$rawdata[6]}{'ALLSTATE'}{DailyRA} = [];
			$data{$rawdata[6]}{'ALLSTATE'}{Daily} = [];
			$data{$rawdata[6]}{'ALLSTATE'}{Cum} = [];
			$data{$rawdata[6]}{'ALLSTATE'}{CumMobility} = [];
			$data{$rawdata[6]}{'ALLSTATE'}{AllCumMobility} = [];
			$data{$rawdata[6]}{'ALLSTATE'}{StartingDay} = -1;
			$data{$rawdata[6]}{'ALLSTATE'}{FatalityDelay} = 35;
			$data{$rawdata[6]}{'ALLSTATE'}{DailyRA} = [];
			$data{$rawdata[6]}{'ALLSTATE'}{LastDayFatality} = $rawdata[$#rawdata];
			$data{$rawdata[6]}{'ALLSTATE'}{Lat} = $rawdata[8];
			$data{$rawdata[6]}{'ALLSTATE'}{Long} = $rawdata[9];
			$data{$rawdata[6]}{'ALLSTATE'}{Population} = $rawdata[11];		
			$data{$rawdata[6]}{'ALLSTATE'}{LastMobDay} = -1;
			$data{$rawdata[6]}{'ALLSTATE'}{CountyCN} = 1;
			$data{$rawdata[6]}{'ALLSTATE'}{FatalityLastDay} = $#rawdata-12;
		}
		else {
			$data{$rawdata[6]}{'ALLSTATE'}{LastDayFatality} += $rawdata[$#rawdata];
			$data{$rawdata[6]}{'ALLSTATE'}{Population} += $rawdata[11];
			$data{$rawdata[6]}{'ALLSTATE'}{CountyCN} += 1;
			$data{$rawdata[6]}{'ALLSTATE'}{Lat} += $rawdata[8];
			$data{$rawdata[6]}{'ALLSTATE'}{Long} += $rawdata[9];
		}
		if(!$statelevel&&$rawdata[$#rawdata]>=$LastDayFatalityValue) {
			print("[$cn] $rawdata[6] $rawdata[5] $rawdata[$#rawdata]\n");
			push @allstate, $rawdata[6];
			push @allcounty, $rawdata[5];
			$cn++;
		}
		push @everystate, $rawdata[6];
		push @everycounty, $rawdata[5];
		
		for(my $j=12;$j<=$#rawdata;$j++) {
			$data{$rawdata[6]}{$rawdata[5]}{Cum}[$j-12] = $rawdata[$j];
			if($j>12) {
				#print "$rawdata[6] $rawdata[5] rawdata j is $rawdata[$j], j is $j ", "rawdata j-1 is ", $rawdata[$j-1],"\n" ;
				#running average here
				$data{$rawdata[6]}{$rawdata[5]}{Daily}[$j-12] = $rawdata[$j] - $rawdata[$j-1];
			}
			else {
				$data{$rawdata[6]}{$rawdata[5]}{Daily}[$j-12] = 0;
			}
			if($j==12) {
				$data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12] = 0;
			}
			elsif($j==13) {
				$data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12] = ($rawdata[$j+1] - $rawdata[$j-1])/2.0;
			}
			elsif($j==14) {
				$data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12] = ($rawdata[$j+2] - $rawdata[$j-2])/4.0;
			}
			elsif($j==$#rawdata){
				$data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12] = $rawdata[$j] - $rawdata[$j-1];
			}
			elsif($j==($#rawdata-1)){
				$data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12] = ($rawdata[$j+1] - $rawdata[$j-1])/2.0;
			}
			else {
				$data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12] = ($rawdata[$j+2] - $rawdata[$j-3])/5.0;
			}

			# For the whole state
			if(!defined($data{$rawdata[6]}{'ALLSTATE'}{DailyRA}[$j-12])) {
				$data{$rawdata[6]}{'ALLSTATE'}{DailyRA}[$j-12] = $data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12];
			}
			else {
				$data{$rawdata[6]}{'ALLSTATE'}{DailyRA}[$j-12] += $data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12];
			}
			if(!defined($data{$rawdata[6]}{'ALLSTATE'}{Daily}[$j-12])) {
				$data{$rawdata[6]}{'ALLSTATE'}{Daily}[$j-12] = $rawdata[$j] - $rawdata[$j-1];
			}
			else {
				$data{$rawdata[6]}{'ALLSTATE'}{Daily}[$j-12] += $rawdata[$j] - $rawdata[$j-1];
			}
			if(!defined($data{$rawdata[6]}{'ALLSTATE'}{Cum}[$j-12])) {
				$data{$rawdata[6]}{'ALLSTATE'}{Cum}[$j-12] = $rawdata[$j];
			}
			else {
				$data{$rawdata[6]}{'ALLSTATE'}{Cum}[$j-12] += $rawdata[$j];
			}

		}

		for(my $j=12;$j<=$#rawdata;$j++) {
			if($data{$rawdata[6]}{$rawdata[5]}{DailyRA}[$j-12]>$startingdaily && $data{$rawdata[6]}{$rawdata[5]}{StartingDay}==-1) {
				$data{$rawdata[6]}{$rawdata[5]}{StartingDay} = $j-12;
			}
		}
	}
}

close(Daily);

#########Processing on states##################
open(Mobility, "Global_Mobility_Report.csv");
my $lastmobday=0;
$firstline = <Mobility>;
while (<Mobility>) {
	my $line = $_;
	chomp($line);
	my @rawdata = split(',', $line);
	if($rawdata[0] =~ "US") {
		my $state = $rawdata[2];
		my $county = substr($rawdata[3], 0, length($rawdata[3])-7);
#		print("Here we have state as $state, county as $county full count $rawdata[3]\n");
		my $statetag = substr($rawdata[5],0,3);
		if($statetag =~ "US-") {
			$county = 'ALLSTATE';
			#print("Hit here\n");
		}
		my $fips = $rawdata[6];
		if(!($fips eq '')) {
			my $statefips = int($fips/1000);
			$data{$state}{$county}{FIPS} = $fips;
			$data{$state}{'ALLSTATE'}{FIPS} = $statefips;
		}
		
		if(!defined($data{$state}{$county}{Mobility})) {
			$data{$state}{$county}{Mobility}=[];
		}
		my ($myy, $mym, $myd) = split('-', $rawdata[7]);
		if($mym>=1&&$mym<=12) {
			my $datediff = daycounts($mym, $myd) - daycounts($refm, $refd);
			if(!($rawdata[8+$mobilitytype] eq '')&&!($rawdata[8+$mobilitytype+3] eq '')&&!($rawdata[8+$mobilitytype+4] eq '')) {
				#$data{$state}{$county}{Mobility}[$datediff] = $rawdata[8+$mobilitytype];
				#Mix Retail, Transit and Workplace with 1:1:1 ratio
				$data{$state}{$county}{Mobility}[$datediff] = ($rawdata[8]+$rawdata[11]+$rawdata[12])/3.0;
				$data{$state}{$county}{LastMobDay} = $datediff;
			}
			else
			{
				if(defined($data{$state}{$county}{LastDayFatality})) {
					if($data{$state}{$county}{LastDayFatality}>$LastDayFatalityValue) {
						print("Caution! Mobility data incomplete!\n");
					}
				}
			}
		}
		else {
			print("No date!!! $line\n");
		}
	}
}

my $mobility = $data{'Arizona'}{'ALLSTATE'}{Mobility};
print("Max day from mobility is $#$mobility\n");

my $totalfatality=0;
my $nsuperstate=1; #including New Mexico
my @supermobilitycn;
for(my $i=0;$i<$#$mobility;$i++) {$supermobilitycn[$i]=1;}
foreach my $state (keys %data) {
	#print("Here is my state: $state ",$data{$state}{'ALLSTATE'}{Population}," ",$data{$state}{'ALLSTATE'}{CountyCN}," ",$data{$state}{'ALLSTATE'}{LastDayFatality},"\n");
	if(defined($data{$state}{'ALLSTATE'}{Lat})) {
		$data{$state}{'ALLSTATE'}{Lat} /= $data{$state}{'ALLSTATE'}{CountyCN};
		$data{$state}{'ALLSTATE'}{Long} /= $data{$state}{'ALLSTATE'}{CountyCN};
		my $dailyra = $data{$state}{'ALLSTATE'}{DailyRA};
		for(my $i=0; $i<=$#$dailyra; $i++) {
			if($data{$state}{'ALLSTATE'}{DailyRA}[$i]>$startingdaily && $data{$state}{'ALLSTATE'}{StartingDay}==-1) {
				$data{$state}{'ALLSTATE'}{StartingDay} = $i;
			}
		}
		
		if($data{$state}{'ALLSTATE'}{LastDayFatality}>$LastDayFatalityValueState) {
			$totalfatality+=$data{$state}{'ALLSTATE'}{LastDayFatality};
			#print("[$cn] $state ",$data{$state}{'ALLSTATE'}{LastDayFatality},"\n");
			if($statelevel) {
				push @allstate, $state;
				push @allcounty, 'ALLSTATE';
				$cn++;
			}
		}
		else {
			my $dailyra = $data{'New Mexico'}{'ALLSTATE'}{DailyRA};
			$nsuperstate++;
			my $i;
			for($i=0;$i<=$#$dailyra;$i++) {
				$data{'New Mexico'}{'ALLSTATE'}{DailyRA}[$i]+=$data{$state}{'ALLSTATE'}{DailyRA}[$i];
				$data{'New Mexico'}{'ALLSTATE'}{Daily}[$i]+=$data{$state}{'ALLSTATE'}{Daily}[$i];
				$data{'New Mexico'}{'ALLSTATE'}{Cum}[$i]+=$data{$state}{'ALLSTATE'}{Cum}[$i];
			}
			for($i=0;$i<$#$mobility;$i++) {
				if(defined($data{$state}{'ALLSTATE'}{Mobility}[$i])) {
					$data{'New Mexico'}{'ALLSTATE'}{Mobility}[$i] += $data{$state}{'ALLSTATE'}{Mobility}[$i];
					$supermobilitycn[$i]++;
				}
			}
			$data{'New Mexico'}{'ALLSTATE'}{LastDayFatality} += $data{$state}{'ALLSTATE'}{LastDayFatality};
		}
	}
}
my $dailyra = $data{'New Mexico'}{'ALLSTATE'}{DailyRA};
$data{'New Mexico'}{'ALLSTATE'}{StartingDay}=-1;
for(my $i=0; $i<=$#$dailyra; $i++) {
	if($data{'New Mexico'}{'ALLSTATE'}{DailyRA}[$i]>5*$startingdaily && $data{'New Mexico'}{'ALLSTATE'}{StartingDay}==-1) {
		$data{'New Mexico'}{'ALLSTATE'}{StartingDay} = $i;
	}
}


for(my $i=0;$i<$#$mobility;$i++) {
	if(defined($data{'New Mexico'}{'ALLSTATE'}{Mobility}[$i])) {
		$data{'New Mexico'}{'ALLSTATE'}{Mobility}[$i] /= $supermobilitycn[$i]*1.0;
	}
}



print("Total fatality of US is $totalfatality allentry $allentryfatality nsuperstate is $nsuperstate\n");

my $sum1=0;
my $sum2=0;
my $sum3=0;

for(my $i=0;$i<$#allstate;$i++) {
	$sum1+=$data{$allstate[$i]}{'ALLSTATE'}{Cum}[$data{$allstate[$i]}{'ALLSTATE'}{FatalityLastDay}];
	$sum2+=$data{$allstate[$i]}{'ALLSTATE'}{Cum}[$data{$allstate[$i]}{'ALLSTATE'}{FatalityLastDay}-1-$datesback];
	$sum3+=$data{$allstate[$i]}{'ALLSTATE'}{LastDayFatality};
	print("Here! $allstate[$i] ",$data{$allstate[$i]}{'ALLSTATE'}{Cum}[$data{$allstate[$i]}{'ALLSTATE'}{FatalityLastDay}]
	," ",$data{$allstate[$i]}{'ALLSTATE'}{Cum}[$data{$allstate[$i]}{'ALLSTATE'}{FatalityLastDay}-1-$datesback]
	," ", $data{$allstate[$i]}{'ALLSTATE'}{LastDayFatality}
	,"\n");
}
#my $baselinefatality = $sum2;
my $baselinefatality = $allentryfatality;

print("Total fatality lastday $sum1 thedaybefore $sum2 lastdayfromlastdayfatality $sum3\n");

################# reorder state/county####################
for(my $i=0;$i<$#allstate-1;$i++) {
	for(my $j=$i+1;$j<=$#allstate;$j++) {
		if($data{$allstate[$i]}{$allcounty[$i]}{LastDayFatality} < $data{$allstate[$j]}{$allcounty[$j]}{LastDayFatality}) {
			my $temp;
			$temp = $allstate[$i]; $allstate[$i] = $allstate[$j]; $allstate[$j] = $temp;
			$temp = $allcounty[$i]; $allcounty[$i] = $allcounty[$j]; $allcounty[$j] = $temp;
		}
	}
}
for(my $i=0;$i<$#allstate;$i++) {
	print("[$i] ", $allstate[$i], " ",$data{$allstate[$i]}{$allcounty[$i]}{LastDayFatality},"\n");
}

###############Capital area of New York ############################
#=for comment
#$dailyra = $data{'Special Interest'}{'CapitalNY'}{DailyRA};
# Put everything to Albany
#my @capitalcounties=('Schenectady', 'Rensselaer', 'Saratoga');
my @capitalcounties=('Schenectady', 'Saratoga','Rensselaer');

my $ncountiescapital++;
for(my $i=0;$i<$#$mobility;$i++) {$supermobilitycn[$i]=0;}
for(my $j=0;$j<=$#capitalcounties;$j++) {
	for(my $i=0;$i<=$#$dailyra;$i++) {
		$data{'New York'}{'Albany'}{DailyRA}[$i]+=$data{'New York'}{$capitalcounties[$j]}{DailyRA}[$i];
		$data{'New York'}{'Albany'}{Daily}[$i]+=$data{'New York'}{$capitalcounties[$j]}{Daily}[$i];
		$data{'New York'}{'Albany'}{Cum}[$i]+=$data{'New York'}{$capitalcounties[$j]}{Cum}[$i];
	}
	for(my $i=0;$i<$#$mobility;$i++) {
		if(defined($data{'New York'}{$capitalcounties[$j]}{Mobility}[$i])) {
			$data{'New York'}{'Albany'}{Mobility}[$i] += $data{'New York'}{$capitalcounties[$j]}{Mobility}[$i];
			$supermobilitycn[$i]++;
		}
	}
	$data{'New York'}{'Albany'}{LastDayFatality} += $data{'New York'}{$capitalcounties[$j]}{LastDayFatality};
}

$data{'New York'}{'Albany'}{FatalityDelay}=30;
$data{'New York'}{'Albany'}{StartingDay}=-1;
$data{'New York'}{'Albany'}{CumMobility}=[];
for(my $i=0; $i<=$#$dailyra; $i++) {
	if($data{'New York'}{'Albany'}{DailyRA}[$i]>$startingdaily && $data{'New York'}{'Albany'}{StartingDay}==-1) {
		$data{'New York'}{'Albany'}{StartingDay} = $i;
	}
}

for(my $i=0;$i<$#$mobility;$i++) {
	if(defined($data{'New York'}{'Albany'}{Mobility}[$i])) {
		if($supermobilitycn[$i]>0) {
			$data{'New York'}{'Albany'}{Mobility}[$i] /= $supermobilitycn[$i]*1.0;
		}
	}
}
print("Special Interest, Capital NY, starting day ", $data{'New York'}{'Albany'}{StartingDay}, "\n");
push @allstate, 'New York';
push @allcounty, 'Albany';
#=cut
##############################################################################


#my $date1 = daycounts(1,3);
#my $date2 = daycounts(2,29);
#my $date3 = daycounts(3,5);
#print("days are $date1, $date2, $date3\n");


open(Outputeverycounty, ">$interestm.outputeverycounty");
open(Outputeverycounty1, ">$interestm.outputeverycounty1");
open(Outputeverycounty2, ">$interestm.outputeverycounty2");
open(Outputeverycounty3, ">$interestm.outputeverycounty3");
for(my $j=0;$j<=$#everystate;$j++) {
	my $cummob=0.0;
	my $count = 0;
	my @cummobm;
	my @countm;
	for(my $k=1;$k<=12;$k++) {
		$cummobm[$k] = 0;
		$countm[$k] = 0;
	}
#	for(my $k=$data{$everystate[$j]}{$everycounty[$j]}{LastMobDay}-6;$k<=$data{$everystate[$j]}{$everycounty[$j]}{LastMobDay};$k++) {
	for(my $k=0;$k<$#$mobility;$k++) {
		if(defined($data{$everystate[$j]}{$everycounty[$j]}{Mobility}[$k])) {
			$cummob = $cummob + 1.0 + $data{$everystate[$j]}{$everycounty[$j]}{Mobility}[$k] * 0.01;
			$count++;
			my $currentm = getmonth($k+daycounts($refm, $refd));
			if($currentm>=1 && $currentm<=12) {
				$cummobm[$currentm] += 1.0 + $data{$everystate[$j]}{$everycounty[$j]}{Mobility}[$k] * 0.01;
				$countm[$currentm]++;
			}
			else {
				print("Error here, month is $currentm\n");
			}
		}
		
	}
	for(my $k=1;$k<=12;$k++) {
		if($countm[$k]>0) {
			$cummobm[$k] = $cummobm[$k]/$countm[$k];
		}
	}
	if($count>0) {$cummob = $cummob/$count};
	if( $countm[$interestm]>5 &&($data{$everystate[$j]}{$everycounty[$j]}{Population}>200000) && ($data{$everystate[$j]}{$everycounty[$j]}{Long}>-130)) {
		print Outputeverycounty "$data{$everystate[$j]}{$everycounty[$j]}{Lat} $data{$everystate[$j]}{$everycounty[$j]}{Long} $data{$everystate[$j]}{$everycounty[$j]}{Population} $data{$everystate[$j]}{$everycounty[$j]}{LastMobDay} $cummobm[$interestm] $countm[$interestm]\n";
		if($cummobm[$interestm]<0.70) {
			print Outputeverycounty1 "$data{$everystate[$j]}{$everycounty[$j]}{Lat} $data{$everystate[$j]}{$everycounty[$j]}{Long} $data{$everystate[$j]}{$everycounty[$j]}{Population} $data{$everystate[$j]}{$everycounty[$j]}{LastMobDay} $cummobm[$interestm] $countm[$interestm]\n";
		}
		elsif($cummobm[$interestm]<0.80){
			print Outputeverycounty2 "$data{$everystate[$j]}{$everycounty[$j]}{Lat} $data{$everystate[$j]}{$everycounty[$j]}{Long} $data{$everystate[$j]}{$everycounty[$j]}{Population} $data{$everystate[$j]}{$everycounty[$j]}{LastMobDay} $cummobm[$interestm] $countm[$interestm]\n";
		}
		else {
			print Outputeverycounty3 "$data{$everystate[$j]}{$everycounty[$j]}{Lat} $data{$everystate[$j]}{$everycounty[$j]}{Long} $data{$everystate[$j]}{$everycounty[$j]}{Population} $data{$everystate[$j]}{$everycounty[$j]}{LastMobDay} $cummobm[$interestm] $countm[$interestm]\n";
		}
	}
}
close(Outputeverycounty);
close(Outputeverycounty1);
close(Outputeverycounty2);
close(Outputeverycounty3);

for(my $j=0;$j<=$#$mobility;$j++) {
	if(defined($data{'Arizona'}{'ALLSTATE'}{Mobility}[$j]) && defined($data{'Arizona'}{'ALLSTATE'}{Cum}[$j])) {
#		print("$j $data{'Arizona'}{'ALLSTATE'}{Mobility}[$j] $data{'Arizona'}{'ALLSTATE'}{Cum}[$j] $data{'Arizona'}{'ALLSTATE'}{Daily}[$j] $data{'Arizona'}{'ALLSTATE'}{DailyRA}[$j]\n");
	}
}
#print("Starting date is ", $data{'New York'}{'Nassau'}{StartingDay},"\n");
print("Fatality delay for New Mexico is ", $data{'New Mexico'}{'ALLSTATE'}{FatalityDelay}, "\n");

#my $mobility = $data{'New York'}{'Nassau'}{Mobility};
#$data{'Arizona'}{'Maricopa'}{FatalityDelay} = 35;
#$data{'California'}{'Los Angeles'}{FatalityDelay} = 35;
#$data{'Connecticut'}{'Fairfield'}{FatalityDelay} = 35;
$data{'Connecticut'}{'Hartford'}{FatalityDelay} = 42;
$data{'Connecticut'}{'New Haven'}{FatalityDelay} = 42;
#$data{'Florida'}{'Miami-Dade'}{FatalityDelay} = 35;
$data{'Illinois'}{'Cook'}{FatalityDelay} = 42;
$data{'Texas'}{'Harris'}{FatalityDelay} = 18;
#$data{'Massachusetts'}{'Essex'}{FatalityDelay} = 35;
#$data{'Massachusetts'}{'Middlesex'}{FatalityDelay} = 35;
#$data{'Massachusetts'}{'Suffolk'}{FatalityDelay} = 35;
#$data{'Michigan'}{'Oakland'}{FatalityDelay} = 35;
#$data{'Michigan'}{'Wayne'}{FatalityDelay} = 35;
#$data{'New Jersey'}{'Bergen'}{FatalityDelay} = 35;
#$data{'New Jersey'}{'Essex'}{FatalityDelay} = 35;
#$data{'New Jersey'}{'Hudson'}{FatalityDelay} = 35;
#$data{'New Jersey'}{'Middlesex'}{FatalityDelay} = 35;
#$data{'New Jersey'}{'Passaic'}{FatalityDelay} = 35;
#$data{'New Jersey'}{'Union'}{FatalityDelay} = 35;
#$data{'New York'}{'Nassau'}{FatalityDelay} = 35;
$data{'New York'}{'New York'}{FatalityDelay} = 20;
$data{'New York'}{'ALLSTATE'}{FatalityDelay} = 30;#28 before
$data{'New Jersey'}{'ALLSTATE'}{FatalityDelay} = 35;
$data{'Georgia'}{'ALLSTATE'}{FatalityDelay} = 30;
$data{'California'}{'ALLSTATE'}{FatalityDelay} = 30;
$data{'Iowa'}{'ALLSTATE'}{FatalityDelay} = 50;
$data{'Florida'}{'ALLSTATE'}{FatalityDelay} = 25; #30 before
$data{'Louisiana'}{'ALLSTATE'}{FatalityDelay} = 30;
$data{'Texas'}{'ALLSTATE'}{FatalityDelay} = 25;
$data{'South Carolina'}{'ALLSTATE'}{FatalityDelay} = 30;
$data{'North Carolina'}{'ALLSTATE'}{FatalityDelay} = 40;
$data{'Ohio'}{'ALLSTATE'}{FatalityDelay} = 45;
$data{'Indiana'}{'ALLSTATE'}{FatalityDelay} = 35;
$data{'New Mexico'}{'ALLSTATE'}{FatalityDelay} = 45; #40 before
$data{'Illinois'}{'ALLSTATE'}{FatalityDelay} = 45;
$data{'Maryland'}{'ALLSTATE'}{FatalityDelay} = 40;
$data{'Minnesota'}{'ALLSTATE'}{FatalityDelay} = 50;
$data{'Mississippi'}{'ALLSTATE'}{FatalityDelay} = 40;
$data{'Alabama'}{'ALLSTATE'}{FatalityDelay} = 40;
$data{'Massachusetts'}{'ALLSTATE'}{FatalityDelay} = 40;
$data{'Rhode Island'}{'ALLSTATE'}{FatalityDelay} = 30;
$data{'Wisconsin'}{'ALLSTATE'}{FatalityDelay} = 45;
$data{'Nevada'}{'ALLSTATE'}{FatalityDelay} = 30;
$data{'Oklahoma'}{'ALLSTATE'}{FatalityDelay} = 30;
$data{'Pennsylvania'}{'ALLSTATE'}{FatalityDelay} = 40;
$data{'Washington'}{'ALLSTATE'}{FatalityDelay} = 30;
#$data{'Arizona'}{'Maricopa'}{FatalityDelay} = 30;

#$data{'New York'}{'Suffolk'}{FatalityDelay} = 35;
#$data{'New York'}{'Westchester'}{FatalityDelay} = 35;
#$data{'Pennsylvania'}{'Philadelphia'}{FatalityDelay} = 35;

$data{'Washington'}{'ALLSTATE'}{StartingDay} = 80;

$data{'New York'}{'ALLSTATE'}{StartingDay} += 15;
$data{'New Jersey'}{'ALLSTATE'}{StartingDay} += 15;
$data{'California'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Massachusetts'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Illinois'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Indiana'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Michigan'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Ohio'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Maryland'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Minnesota'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Missouri'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Tennessee'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Rhode Island'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Nevada'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Oklahoma'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Pennsylvania'}{'ALLSTATE'}{StartingDay} += 15;
$data{'New Mexico'}{'ALLSTATE'}{StartingDay} += 15;

#$data{'Florida'}{'ALLSTATE'}{StartingDay} += 15;
$data{'Florida'}{'ALLSTATE'}{StartingDay} = 150;
$data{'Texas'}{'ALLSTATE'}{StartingDay} = 150;
$data{'California'}{'ALLSTATE'}{StartingDay} = 150;
$data{'Arizona'}{'ALLSTATE'}{StartingDay} = 150;
$data{'South Carolina'}{'ALLSTATE'}{StartingDay} = 150;
$data{'Georgia'}{'ALLSTATE'}{StartingDay} = 150;
$data{'Mississippi'}{'ALLSTATE'}{StartingDay} = 150;
$data{'Louisiana'}{'ALLSTATE'}{StartingDay} = 150;
#$data{'New Mexico'}{'ALLSTATE'}{StartingDay} = 150;


#$data{'New York'}{'New York'}{StartingDay} += 20;
$data{'New York'}{'New York'}{StartingDay} =70;
$data{'Illinois'}{'Cook'}{StartingDay} =70;
$data{'Texas'}{'Harris'}{StartingDay} = 80;
#$data{'Arizona'}{'Maricopa'}{StartingDay} = 70;
#$data{'Michigan'}{'Wayne'}{StartingDay} =80;
#$data{'New Jersey'}{'Essex'}{StartingDay} =80;

####From https://www.edweek.org/ew/section/multimedia/map-coronavirus-and-school-closures.html
$data{'New York'}{SchoolCloseDay} = daycounts(03,18) - daycounts($refm,$refd);
$data{'Arizona'}{SchoolCloseDay} = daycounts(03,16) - daycounts($refm,$refd);
$data{'California'}{SchoolCloseDay} = daycounts(03,19) - daycounts($refm,$refd);
$data{'Connecticut'}{SchoolCloseDay} = daycounts(03,17) - daycounts($refm,$refd);
$data{'Florida'}{SchoolCloseDay} = daycounts(03,16) - daycounts($refm,$refd);
$data{'Georgia'}{SchoolCloseDay} = daycounts(03,18) - daycounts($refm,$refd);
$data{'Illinois'}{SchoolCloseDay} = daycounts(03,17) - daycounts($refm,$refd);
$data{'Indiana'}{SchoolCloseDay} = daycounts(03,20) - daycounts($refm,$refd);
$data{'Iowa'}{SchoolCloseDay} = daycounts(03,16) - daycounts($refm,$refd);
$data{'Louisiana'}{SchoolCloseDay} = daycounts(03,16) - daycounts($refm,$refd);
$data{'Massachusetts'}{SchoolCloseDay} = daycounts(03,17) - daycounts($refm,$refd);
$data{'Michigan'}{SchoolCloseDay} = daycounts(03,16) - daycounts($refm,$refd);
$data{'Minnesota'}{SchoolCloseDay} = daycounts(03,18) - daycounts($refm,$refd);
$data{'Mississippi'}{SchoolCloseDay} = daycounts(03,20) - daycounts($refm,$refd);
$data{'Missouri'}{SchoolCloseDay} = daycounts(03,23) - daycounts($refm,$refd);
$data{'New Jersey'}{SchoolCloseDay} = daycounts(03,18) - daycounts($refm,$refd);
$data{'Ohio'}{SchoolCloseDay} = daycounts(03,17) - daycounts($refm,$refd);
$data{'Pennsylvania'}{SchoolCloseDay} = daycounts(03,16) - daycounts($refm,$refd);
$data{'Texas'}{SchoolCloseDay} = daycounts(03,23) - daycounts($refm,$refd);
$data{'Washington'}{SchoolCloseDay} = daycounts(03,17) - daycounts($refm,$refd);
$data{'Wisconsin'}{SchoolCloseDay} = daycounts(03,17) - daycounts($refm,$refd);





if( -d "fig") {
	print "We have fig folder!\n";
}
else {
	mkdir "fig";
}

for(my $i=0;$i<6;$i++) {
	if( -d "scaling-$i") {
		print "We have fig folder!\n";
	}
	else {
		mkdir "scaling-$i";
	}

}

my ($x, $y) = calcxy('New York', 'New York', 20);
open(OutputXY, ">fig/NY.noshift.xy.$data{'New York'}{'New York'}{StartingDay}");
for(my $j=0;$j<$#$x;$j++) {
	print OutputXY "$$x[$j] $$y[$j]\n";
}
close(OutputXY);

open(OutputXY,">fig/NYC.Data");
for(my $j=$data{'New York'}{'New York'}{StartingDay};$j<$#$mobility;$j++) {
#	print OutputXY "$j $data{'New York'}{'New York'}{DailyRA}[$j] ",$data{'New York'}{'New York'}{CumMobility}[$j-20],"\n";
}
close(OutputXY);

#plotit($x, $y,"fig/simple.png");
my $lineFit = Statistics::LineFit->new();
$lineFit->setData ($x, $y) or die "Invalid data";
my ($intercept, $slope) = $lineFit->coefficients();
my ($x1, $y1, $x2, $y2) = predict('New York', 'New York', $intercept, $slope, $#$mobility, 20);
plotit2($x1, $y1, $x2,$y2, "fig/check.png");
my ($xs, $ys) = calcxy('California', 'Los Angeles', $data{'California'}{'Los Angeles'}{FatalityDelay});
#open(OutputXY, ">fig/NYC.allxy.$data{'New York'}{'New York'}{FatalityDelay}");
open(OutputXY, ">fig/LA.xy.$data{'California'}{'Los Angeles'}{FatalityDelay}");
for(my $j=0;$j<$#$xs;$j++) {
	print OutputXY "$$xs[$j] $$ys[$j]\n";
}
close(OutputXY);
#exit;

my @mychart;
my @mypredchart;
my @mymobchart;
my @mybetachart;

my $chart = Chart::Gnuplot->new(
	    output => "fig/xy"."mobility-".$mobilitytype.".png",
	    terminal => "png",
#	    title  => $allstate[$j]." ".$allcounty[$j],
#    xlabel => "L/t",
#    ylabel => "ln(f/f0)",
#	    imagesize => "2048, 1536",
	    imagesize => "2600, 800",
    xrange => [-1, 1.1],
    yrange => [-0.02, 0.2],
    legend => {
		position => "outside center bottom",
		width => 10
		}
#	xtics => { fontsize => "20"}
);

my $predchart = Chart::Gnuplot->new(
	    output => "fig/pred"."mobility-".$mobilitytype.".png",
	    terminal => "png",
#	    title  => $allstate[$j]." ".$allcounty[$j],
#    xlabel => "L/t",
#    ylabel => "ln(f/f0)",
	    imagesize => "2600, 800",
	    legend => {
		position => "outside center bottom"
		},
#	    xtics => { fontsize => "20"}
);

my $mobchart = Chart::Gnuplot->new(
	    output => "fig/mobility-".$mobilitytype.".png",
	    terminal => "png",
#	    title  => $allstate[$j]." ".$allcounty[$j],
#    xlabel => "L/t",
#    ylabel => "ln(f/f0)",
#	    imagesize => "2048, 1536",
	    imagesize => "2600, 800",
    xrange => [-1, 1.1],
    yrange => [-0.02, 0.2],
    legend => {
		position => "outside center bottom",
		width => 10
		}
#	xtics => { fontsize => "20"}
);

my $betachart = Chart::Gnuplot->new(
	    output => "fig/beta-".$mobilitytype.".png",
	    terminal => "png",
#	    title  => $allstate[$j]." ".$allcounty[$j],
#    xlabel => "L/t",
#    ylabel => "ln(f/f0)",
#	    imagesize => "2048, 1536",
	    imagesize => "2600, 800",
    xrange => [-1, 1.1],
    yrange => [-0.02, 0.2],
    legend => {
		position => "outside center bottom",
		width => 10
		}
#	xtics => { fontsize => "20"}
);


my @dateactual;
#my @mymobility;
for(my $k=$mobilitystartingdate;$k<=$#$mobility;$k++) {
	$dateactual[$k]=$k;
}
#######################predict###########################
for(my $j=0;$j<=$#allstate;$j++) {
#	$data{$allstate[$j]}{'ALLSTATE'}{StartingDay} = 140;
}
#my $sdate=193+7-$datesback; #193, Aug 2, 2020
my $sdate = $data{'New York'}{'ALLSTATE'}{FatalityLastDay} + 1; # 193+7

my $nweek=1;
my @incbyweek;
my @errorbyweek;
my @incbyweekstate;
my @errorbyweekstate;
for (my $j=0;$j<=$#allstate;$j++) {
#	$incbyweekstate[$j] = 0;
#	$errorbyweekstate[$j] = 0;
}
#############Change HERE!!!######################################
my $datepredict = '2020-08-23';
my %daysfromweek = (1 =>'2020-08-29',2=>'2020-09-05',3=>'2020-09-12',4=>'2020-09-19');
#my $datepredict = '2020-07-06';
#my %daysfromweek = (1 =>'2020-07-05',2=>'2020-07-12',3=>'2020-07-19',4=>'2020-07-26');
#open(OUTPUT, ">forhub.data");
my ($mycm, $mycd) = fromdaystodate($sdate+daycounts($refm, $refd));
print("CHKCHK: sdate is $sdate, which is $mycm-$mycd, first week is $daysfromweek{1}\n");
($mycm, $mycd) = fromdaystodate($data{'New York'}{'ALLSTATE'}{FatalityLastDay}+daycounts($refm, $refd));
print("CHKCHK: lastday of fatality data is $data{'New York'}{'ALLSTATE'}{FatalityLastDay}, which is $mycm-$mycd, baseline fatality is $baselinefatality\n");

if($statelevel==1) {
	open(WEBSITE, ">outputforwebsite.data");
	print WEBSITE "Statename, FIPS, Date, Days_from_Ref, RelativeMobility, CumulativeMobility, Actual-Predict, FatalityRA, CumFatality_Stayput, SchoolOpenNow1%,SchoolOpenNow2%,MaskMandate25%, MaskMandate50%, Shutdown1week, Shutdown2week, Population\n";
	for (my $date = 0; $date < 193+8*7 + 7 + 7;$date++) {
		my $dasum = 0;
		my $cumsum = 0;
		my @vdasum; #six variations, 2% school, 5% school, 25% mask 50% mask, 50% lockdown for 1week, 2 week
		my @vcumsum;
		for(my $jj=0;$jj<6;$jj++) {$vdasum[$jj]=0;$vcumsum[$jj]=0;}
		my ($cm, $cd) = fromdaystodate($date+daycounts($refm, $refd));
		my $dayfromref;
		for (my $j=0;$j<=$#allstate;$j++) {
			if(1||!($allstate[$j] =~ 'New Mexico')) {
				if($date < $#$mobility) {
					#not yet started, no cummobility
					$dayfromref = $date - $data{$allstate[$j]}{$allcounty[$j]}{StartingDay};
					if($dayfromref==0) {
						$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$date] = 0.0;
					}
					elsif($dayfromref>0) {
						$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$date] = $data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$date - 1] + 1 + $data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$date]/100.0;
					}
					#my ($mypred, $myerror) = predictday($allstate[$j],$allcounty[$j], $intercept, $slope, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date);
					if(!(defined($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$date]) && defined($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date]))) {
						if($ifnewmexico==1||$allstate[$j] !~ 'New Mexico') {
							print WEBSITE "$allstate[$j],$data{$allstate[$j]}{$allcounty[$j]}{FIPS},2020-$cm-$cd,$dayfromref,,,Actual,,,";
							print WEBSITE ",,,,,,";
							print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{Population}\n";
						}
					}
					else {
						if($ifnewmexico==1||$allstate[$j] !~ 'New Mexico') {
							print WEBSITE "$allstate[$j],$data{$allstate[$j]}{$allcounty[$j]}{FIPS},2020-$cm-$cd,$dayfromref,$data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$date],$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$date],Actual,$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date],$data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date],";
							print WEBSITE ",,,,,,";
							print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{Population}\n";
						}
						$dasum += $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date];
						$cumsum += $data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];							
						for(my $jj=0;$jj<6;$jj++) {
							$vdasum[$jj]=$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date];
							$vcumsum[$jj]=$data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];
						}
					}
				}
				elsif($date < ($sdate-1)) {
					$dayfromref = $date - $data{$allstate[$j]}{$allcounty[$j]}{StartingDay};
					if($ifnewmexico==1||$allstate[$j] !~ 'New Mexico') {
						print WEBSITE "$allstate[$j],$data{$allstate[$j]}{$allcounty[$j]}{FIPS},2020-$cm-$cd,$dayfromref,,,Actual,$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date],$data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date],";
						print WEBSITE ",,,,,,";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{Population}\n";
					}
					$dasum += $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date];
					$cumsum += $data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];							
					for(my $jj=0;$jj<6;$jj++) {
						$vdasum[$jj]=$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date];
						$vcumsum[$jj]=$data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];
					}
					#$data{$allstate[$j]}{$allcounty[$j]}{PredCum}[$date] = $data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];
				}
				elsif($date == ($sdate-1)) {
					$dayfromref = $date - $data{$allstate[$j]}{$allcounty[$j]}{StartingDay};
					if($ifnewmexico==1||$allstate[$j] !~ 'New Mexico') {
						print WEBSITE "$allstate[$j],$data{$allstate[$j]}{$allcounty[$j]}{FIPS},2020-$cm-$cd,$dayfromref,,,Actual,$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date],$data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date],";
						print WEBSITE ",,,,,,";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{Population}\n";
					}
					$data{$allstate[$j]}{$allcounty[$j]}{PredCum}[$date] = $data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];
					for(my $jj=0;$jj<6;$jj++) {$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[$jj][$date] = $data{$allstate[$j]}{$allcounty[$j]}{PredCum}[$date];}
					$dasum += $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date];
					$cumsum += $data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];							
					for(my $jj=0;$jj<6;$jj++) {
						$vdasum[$jj]=$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$date];
						$vcumsum[$jj]=$data{$allstate[$j]}{$allcounty[$j]}{Cum}[$date];
					}
				}
				else {
					$dayfromref = $date - $data{$allstate[$j]}{$allcounty[$j]}{StartingDay};
					my ($mypred, $myerror) = predictday($allstate[$j],$allcounty[$j], $intercept, $slope, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date);
					$data{$allstate[$j]}{$allcounty[$j]}{PredCum}[$date] = $data{$allstate[$j]}{$allcounty[$j]}{PredCum}[$date - 1] + $mypred;
					$dasum += $mypred;
					$cumsum += $data{$allstate[$j]}{$allcounty[$j]}{PredCum}[$date];							
					
					my $predtemp;
					my $errortemp;
					my @myvpred;
					#slope is infection rate, intercept is recovery
					#1%school, + to intercept
					($predtemp, $errortemp) = predictdayshutdown($allstate[$j],$allcounty[$j], 0.01, 1.0, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date, 0);
					$myvpred[0] = $predtemp;
					#2%school, + to intercept
					($predtemp, $errortemp) = predictdayshutdown($allstate[$j],$allcounty[$j], 0.02, 1.0, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date, 0);
					$myvpred[1] = $predtemp;
					#25% mask, (1-0.25)*slope
					($predtemp, $errortemp) = predictdayshutdown($allstate[$j],$allcounty[$j], 0.0, 0.75, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date, 0);
					$myvpred[2] = $predtemp;
					#50% mask, (1-0.5)*slope
					($predtemp, $errortemp) = predictdayshutdown($allstate[$j],$allcounty[$j], 0.0, 0.5, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date, 0);
					$myvpred[3] = $predtemp;
					#50% shutdown 7 days
					($predtemp, $errortemp) = predictdayshutdown($allstate[$j],$allcounty[$j], 0.0, 1.0, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date,7);
					$myvpred[4] = $predtemp;
					#50% shutdown 14 days
					($predtemp, $errortemp) = predictdayshutdown($allstate[$j],$allcounty[$j], 0.0, 1.0, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date,14);
					$myvpred[5] = $predtemp;
					
					for(my $jj=0;$jj<6;$jj++) {$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[$jj][$date] = $data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[$jj][$date-1] + $myvpred[$jj];}
					for(my $jj=0;$jj<6;$jj++) {
						$vdasum[$jj]+=$myvpred[$jj];
						$vcumsum[$jj]+=$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[$jj][$date];
					}

					if($ifnewmexico==1||$allstate[$j] !~ 'New Mexico') {
						print WEBSITE "$allstate[$j],$data{$allstate[$j]}{$allcounty[$j]}{FIPS},2020-$cm-$cd,$dayfromref,,,Prediction,$mypred,$data{$allstate[$j]}{$allcounty[$j]}{PredCum}[$date],";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[0][$date],";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[1][$date],";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[2][$date],";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[3][$date],";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[4][$date],";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{VPredCum}[5][$date],";
						print WEBSITE "$data{$allstate[$j]}{$allcounty[$j]}{Population}\n";
					}
				}
			}

		}
		#OUTPUT for all US. Here is all the states!
		if($date<$sdate) {
			print WEBSITE "US,0,2020-$cm-$cd,$dayfromref,,,Actual,$dasum,$cumsum,";
			print WEBSITE ",,,,,,";
			print WEBSITE "0\n";
		}
		else {
			print WEBSITE "US,0,2020-$cm-$cd,$dayfromref,,,Prediction,$dasum,$cumsum,";
			print WEBSITE "$vcumsum[0],$vcumsum[1],$vcumsum[2],$vcumsum[3],$vcumsum[4],$vcumsum[5],";		
			print WEBSITE "0\n";
		}
		#print WEBSITE "$date 2020-$cm-$cd\n";
	}
	
	
	
	open(OUTPUT, ">forhub.data");
	print OUTPUT "forecast_date,target,target_end_date,location,type,quantile,value\n";
	for(my $iweek=1;$iweek<=4;$iweek++) {
		my $weeksum = 0.0;
		my $weekerror = 0.0;
		my @weeksumstate;
		my @weekerrorstate;
		for(my $j=0;$j<=$#allstate;$j++) {
			$weeksumstate[$j] = 0;
			$weekerrorstate[$j] = 0;
		}
		for(my $date = $sdate; $date<$sdate+7; $date+=1) {
			my $sum=0.0;
			my $quantsum = 0.0;
			my $actualsum=0.0;
			my $errorsum = 0.0;
			for(my $j=0;$j<=$#allstate;$j++) {
				my ($mypred, $myerror) = predictday($allstate[$j],$allcounty[$j], $intercept, $slope, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, $date);
				$sum+=$mypred;
				$weeksumstate[$j]+=$mypred;
				#$quantsum += $myquantpred;
				$errorsum += $myerror;
				$weekerrorstate[$j]+=$myerror;
				if(defined($data{$allstate[$j]}{$allcounty[$j]}{Daily}[$date])) {
					$actualsum += $data{$allstate[$j]}{$allcounty[$j]}{Daily}[$date];
				}
				#if($date == 190) {print("Here $allstate[$j], prediction $mypred, actual, $data{$allstate[$j]}{$allcounty[$j]}{Daily}[$date]\n");}
			}
			print("For $date, sum prediction is $sum, quant sum $quantsum, actual $actualsum\n");
			$weeksum+=$sum;
			$weekerror += $errorsum;
		}
		$sdate+=7;
		print("week $iweek $weeksum $weekerror\n");
		print OUTPUT "$datepredict,$iweek wk ahead inc death,$daysfromweek{$iweek},US,point,NA,$weeksum\n";
		for(my $j=0;$j<=$#quantile;$j++) {
			my $t=Statistics::Distributions::udistr($quantile[$j]);
			#my $ts=Statistics::Distributions::udistr(0.841);
			print("t is $t, ", " ",$t*$weekerror,"\n");
			my $weekquantile = $weeksum-$t*$weekerror;
			if($weekquantile<0) {$weekquantile=0.0;}
			print OUTPUT "$datepredict,$iweek wk ahead inc death,$daysfromweek{$iweek},US,quantile,$quantile[$j],$weekquantile\n";		
		}

		##########output by state
		for(my $k=0;$k<=$#allstate;$k++) {
			if(!($allstate[$k] =~ 'New Mexico')) {
				#OUTPUT
				my $fips = sprintf("%02d",$data{$allstate[$k]}{$allcounty[$k]}{FIPS});
				
				print OUTPUT "$datepredict,$iweek wk ahead inc death,$daysfromweek{$iweek},$fips,point,NA,$weeksumstate[$k]\n";
				for(my $j=0;$j<=$#quantile;$j++) {
					my $t=Statistics::Distributions::udistr($quantile[$j]);
					#my $ts=Statistics::Distributions::udistr(0.841);
					print("t is $t, ", " ",$t*$weekerrorstate[$k],"\n");
					my $weekquantile = $weeksumstate[$k]-$t*$weekerrorstate[$k];
					if($weekquantile<0) {$weekquantile=0.0;}
					print OUTPUT "$datepredict,$iweek wk ahead inc death,$daysfromweek{$iweek},$fips,quantile,$quantile[$j],$weekquantile\n";		
				}
			}
		}
		$incbyweek[$iweek] = $weeksum;
		$errorbyweek[$iweek] = $weekerror;
		for (my $j=0;$j<=$#allstate;$j++) {
			$incbyweekstate[$j][$iweek] = $weeksumstate[$j];
			$errorbyweekstate[$j][$iweek] = $weekerrorstate[$j];
		}
	}
	my $fatalitynow = $baselinefatality;
	my $errornow = 0.0;
	my @fatalitynowstate;
	my @errornowstate;
	for(my $j=0;$j<=$#allstate;$j++) {
		$fatalitynowstate[$j] = $data{$allstate[$j]}{$allcounty[$j]}{LastDayFatality};
		$errornowstate[$j] = 0.0;
	}


	for(my $iweek=1;$iweek<=4;$iweek++) {
		$fatalitynow += $incbyweek[$iweek];
		$errornow += $errorbyweek[$iweek];
		print("week $fatalitynow $errornow\n");
		print OUTPUT "$datepredict,$iweek wk ahead cum death,$daysfromweek{$iweek},US,point,NA,$fatalitynow\n";
		for(my $j=0;$j<=$#quantile;$j++) {
			my $t=Statistics::Distributions::udistr($quantile[$j]);
			#my $ts=Statistics::Distributions::udistr(0.841);
			print("t is $t, ", " ",$t*$errornow,"\n");
			my $weekquantile = $fatalitynow-$t*$errornow;
			if($weekquantile<0) {$weekquantile=0.0;}
			print OUTPUT "$datepredict,$iweek wk ahead cum death,$daysfromweek{$iweek},US,quantile,$quantile[$j],$weekquantile\n";		
		}	
		for(my $k=0;$k<=$#allstate;$k++) {
			if(!($allstate[$k] =~ 'New Mexico')) {
				$fatalitynowstate[$k] += $incbyweekstate[$k][$iweek];
				$errornowstate[$k] += $errorbyweekstate[$k][$iweek];
				my $fips = sprintf("%02d",$data{$allstate[$k]}{$allcounty[$k]}{FIPS});
				print OUTPUT "$datepredict,$iweek wk ahead cum death,$daysfromweek{$iweek},$fips,point,NA,$fatalitynowstate[$k]\n";
				for(my $j=0;$j<=$#quantile;$j++) {
					my $t=Statistics::Distributions::udistr($quantile[$j]);
					#my $ts=Statistics::Distributions::udistr(0.841);
					print("t is $t, ", " ",$t*$errornowstate[$k],"\n");
					my $weekquantile = $fatalitynowstate[$k]-$t*$errornowstate[$k];
					if($weekquantile<0) {$weekquantile=0.0;}
					print OUTPUT "$datepredict,$iweek wk ahead cum death,$daysfromweek{$iweek},$fips,quantile,$quantile[$j],$weekquantile\n";		
				}	
				
			}
		}

	}
	close(OUTPUT);
	close(WEBSITE);

}
#############################Loop over all stored states############################
for(my $j=0;$j<=$#allstate;$j++) {
	$mychart[$j] = Chart::Gnuplot->new();
	my $originalstartingday = $data{$allstate[$j]}{$allcounty[$j]}{StartingDay};
	my @xh;
	my @yh;
	my @dataSet;
	my %color=(0=>'black',1=>'red',2=>'green',3=>'blue',4=>'orange',5=>'violet');
	for(my $k=0;$k<4;$k++) {
		($xh[$k], $yh[$k]) = calcxy($allstate[$j], $allcounty[$j], $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay});
		$dataSet[$k] = Chart::Gnuplot::DataSet->new(
		    xdata => $xh[$k],
		    ydata => $yh[$k],
		    title => $allcounty[$j].",".$allstate[$j],
		    style     => "points",
		    pointtype => "fill-circle",
		    color => $color{$k},
		    pointsize => 2
	    #    ....pp
		);
		$mychart[$j]->add2d($dataSet[$k]);
		$data{$allstate[$j]}{$allcounty[$j]}{StartingDay} = $data{$allstate[$j]}{$allcounty[$j]}{StartingDay} + 15;
	}
	$data{$allstate[$j]}{$allcounty[$j]}{StartingDay} = $originalstartingday;
	my ($x, $y) = calcxy($allstate[$j], $allcounty[$j], $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay});
	
	#if($allstate[$j] =~ 'Arizona' && $allcounty[$j] =~ 'Maricopa') {
	#	($x, $y) = calcxy($allstate[$j], $allcounty[$j], $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay}, 30);
	#}
	#my ($x, $y) = calcxy($allstate[$j], $allcounty[$j], $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay});
	open(OutputXY, ">fig/$allstate[$j].$allcounty[$j].xy");
	for(my $k=0;$k<=$#$x;$k++) {
		print OutputXY "${$x}[$k] ${$y}[$k]\n";
	}
	close(OutputXY);
	
	plotit($x, $y, "fig/simple.".$allstate[$j].".".$allcounty[$j]."mobility-".$mobilitytype.".png");
	my $lineFit = Statistics::LineFit->new();
	$lineFit->setData ($x, $y) or die "Invalid data";
	my ($intercept, $slope) = $lineFit->coefficients();
	my ($intercepterror, $slopeerror) = $lineFit->varianceOfEstimates();
	my $myr2 = $lineFit->rSquared();
	################Calculate school effect##################
	my $withschoolslope = 0.0;
	my @schoolslope;
	my @schoolepsilon;
	my $startingday = -1; #= $data{$allstate[$j]}{$allcounty[$j]}{StartingDay};
	my $schoolcloseday = -1; #
	if(!defined($data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart})) {
		$data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart} = [];
	}
	$data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$mobilitystartingdate] = 0.0;
	for(my $k=$mobilitystartingdate+1;$k<=$#$mobility;$k++) {
		if(defined($data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k])) {
			$data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$k] = $data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$k-1] + (1+0.01*$data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k]);
			#print("start to have mobility for $k day, mobilitystartingdate is $mobilitystartingdate\n");
		}
		else {
			print("mobility missing $allstate[$j] $allcounty[$j] missing day $k\n");
		}
	}
	if(defined($data{$allstate[$j]}{SchoolCloseDay})) {
		#from starting day to school close, we can calculate the slope based on startingday+delay to schoolcloseday+delay ratio
		for(my $k=0;$k<=$#$mobility;$k++) {
			if($startingday<0 && $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k]>1.0) {
				$startingday = $k;
			}
		}
		$schoolcloseday = $data{$allstate[$j]}{SchoolCloseDay};
		my $fatalitydelay = $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay};
		$startingday -= $fatalitydelay;
		while(!defined($data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$startingday])) {
			$startingday++;
		}
		
		for(my $k=0;$k<6;$k++) {
			my $fatalityratio=-1;
			if($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$startingday+$fatalitydelay+$k]>0) {
				$fatalityratio = $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$schoolcloseday+$fatalitydelay-$k]
				/$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$startingday+$fatalitydelay+$k];

				$schoolslope[$k] = (log($fatalityratio) - $intercept*($schoolcloseday-$k-$startingday-$k))/
				($data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$schoolcloseday-$k] 
				- $data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$startingday+$k]);
				$schoolepsilon[$k] = (
				log($fatalityratio) 
				- $intercept*($schoolcloseday-$k-$startingday-$k)
				- $slope*($data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$schoolcloseday-$k] 
				- $data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$startingday+$k])
				)/($schoolcloseday-$k-$startingday-$k)				
				;
			}
			else {
				$schoolslope[$k] = -1;
				$schoolepsilon[$k] = -1;
			}
		}
		
		print("cummobilityNYC $allstate[$j] $allcounty[$j] $data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$schoolcloseday]  $data{$allstate[$j]}{$allcounty[$j]}{CumMobilityFromStart}[$startingday]\n");
	}
	print("$allstate[$j], $allcounty[$j], intercept is $intercept, slope is $slope", " the max % of traffic reduction is ", -$intercept/$slope, " StartingDay ", $data{$allstate[$j]}{$allcounty[$j]}{StartingDay}, " R2 ",$myr2, " Intercepterror ",$intercepterror, " slopeerror ", $slopeerror,
	" fips ", $data{$allstate[$j]}{$allcounty[$j]}{FIPS},
	" schoolstart ", $startingday, " schoolclose ", $schoolcloseday, " schoolslope ","@schoolepsilon",
	" mobstartingday ", $mobilitystartingdate,
#	" cummobility ", $data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$startingday],
	" \n");
#	my ($x1, $y1, $x2, $y2) = predict($allstate[$j],$allcounty[$j], $intercept, $slope, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay});
	my ($x1, $y1, $x2, $y2, $x3, $y3, $x4, $y4) = predictnew($allstate[$j],$allcounty[$j], $intercept, $slope, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay});
	my ($scalex, $scaley) = forscaling($allstate[$j],$allcounty[$j], $intercept, $slope, $#$mobility, $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay});

	if($allstate[$j] =~ 'California' && $allcounty[$j] =~ 'Los Angeles') {
		my $predx = 0.0;
		my @predy;
		for($predx=0.0;$predx<=1.2;$predx+=0.05) {
			for(my $k=0;$k<=$#quantile;$k++) {
				$predy[$k] = quantpredict($predx, $x, $y, $intercept, $slope, $quantile[$k]);
			}
			#print("$predx @predy \n");
		}
	}
#######################################################################
	my @mybeta;
	my @mybeta2;
	my @dates;
	my @dates2;
	my @cummobility;
	my $delayhere = $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay};
	my $betareference=$originalstartingday;#$originalstartingday;
	my $betareference2=170;
#	for(my $k=$originalstartingday-1;$k>=0;$k--) {
#		if(defined($data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k])) {
#			$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k] = $data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k+1] - (1+0.01*$data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k]);
			#print("start to have mobility for $k day, mobilitystartingdate is $mobilitystartingdate\n");
#		}
#	}
	#my $mobilitystartingdate = $data{$allstate[$j]}{$allcounty[$j]}{StartingDay} - $data{$allstate[$j]}{$allcounty[$j]}{FatalityDelay};
	#my $mobilitystartingdate = 
	
	$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$mobilitystartingdate] = 0.0;
	for(my $k=$mobilitystartingdate+1;$k<=$#$mobility;$k++) {
		if(defined($data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k])) {
			$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k] = $data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k-1] + (1+0.01*$data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k]);
			#print("start to have mobility for $k day, mobilitystartingdate is $mobilitystartingdate\n");
		}
	}
	#############Below is added for states, no problem for counties###########################
	while(!defined($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$betareference-$delayhere])) {
		$betareference++;
	}
	#############added end########################################
	my $betareferencedaily = $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$betareference];
	my $betareferencedaily2 = $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$betareference2];
	#$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$originalstartingday]*exp(
	#$slope*($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$betareference2-$delayhere] - $data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$originalstartingday-$delayhere])
	#+$intercept*($betareference2-$originalstartingday));

	for(my $k=$mobilitystartingdate+$delayhere+1;$k<=$#$mobility;$k++) {
		if(!defined($data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k-$delayhere]) || !defined($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k-$delayhere])) {
			#$mymobility[$k]=0;

			print("Missing mobility for $allstate[$j] $allcounty[$j] date $k\n");
		}
		else {
			if($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k]>0 && $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$originalstartingday] > 0 && $k!=$betareference) {
#				$mybeta[$k] = (log($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k]
#				/$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$originalstartingday]) 
#				- $intercept * ($k - $originalstartingday))
#				/($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k-$delayhere]
#				-$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$originalstartingday-$delayhere]);
#				$dates[$k] = $k;
				$mybeta[$k] = (log($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k]
				/$betareferencedaily)
				#$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$betareference]) 
				- $intercept * ($k - $betareference))
				/($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k-$delayhere]
				-$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$betareference-$delayhere]);
				$dates[$k] = $k;
			}
			if($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k]>0 && $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$betareference2] > 0 && ($k<($betareference2-4)||$k>($betareference2+4))) {
#				$mybeta[$k] = (log($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k]
#				/$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$originalstartingday]) 
#				- $intercept * ($k - $originalstartingday))
#				/($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k-$delayhere]
#				-$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$originalstartingday-$delayhere]);
#				$dates[$k] = $k;
				$mybeta2[$k] = (log($data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k]
				/$betareferencedaily2)
				#$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$betareference]) 
				- $intercept * ($k - $betareference2))
				/($data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k-$delayhere]
				-$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$betareference2-$delayhere]);
				$dates2[$k] = $k;
			}

			if($allcounty[$j] =~ 'New York') {
				print("NYC $k $originalstartingday $data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$k] $betareference $betareferencedaily", 
				$data{$allstate[$j]}{$allcounty[$j]}{DailyRA}[$originalstartingday], " ", 
				$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$k-$delayhere], " ",
				$data{$allstate[$j]}{$allcounty[$j]}{CumMobility}[$originalstartingday-$delayhere], "\n");
			}
			#$mymobility[$k]=$data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k];
		}
	}
	$mybetachart[$j] = Chart::Gnuplot->new();
	my $sdstring = sprintf("%d", $betareference);
	my $betadataSet = Chart::Gnuplot::DataSet->new(
	    xdata => \@dates,
	    ydata => \@mybeta,
	    title => $allstate[$j]."-$sdstring",
	style     => "points",
    pointtype => 7,
    color => "blue",
		pointsize => 2
    #    ....pp
	);
	my $sdstring2 = sprintf("%d", $betareference2);
	my $betadataSet2 = Chart::Gnuplot::DataSet->new(
	    xdata => \@dates2,
	    ydata => \@mybeta2,
	    title => $allstate[$j]."-$sdstring2",
	style     => "points",
    pointtype => "fill-circle",
    color => "red",
		pointsize => 1
    #    ....pp
	);
	$mybetachart[$j]->add2d($betadataSet, $betadataSet2);

#######################################################################
	my @mymobility;
	for(my $k=$mobilitystartingdate;$k<=$#$mobility;$k++) {
		if(!defined($data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k])) {
			$mymobility[$k]=0;
			print("Missing mobility for $allstate[$j] $allcounty[$j] date $k\n");
		}
		else {
			$mymobility[$k]=$data{$allstate[$j]}{$allcounty[$j]}{Mobility}[$k];
		}
	}
	$mymobchart[$j] = Chart::Gnuplot->new();
	my $mobdataSet = Chart::Gnuplot::DataSet->new(
	    xdata => \@dateactual,
	    ydata => \@mymobility,
	    title => $allcounty[$j].",".$allstate[$j],
	style     => "points",
    pointtype => "fill-circle",
    color => "green",
		pointsize => 2
    #    ....pp
	);
	$mymobchart[$j]->add2d($mobdataSet);

	###################Below is for the daily fatality prediction#########################
	$mypredchart[$j] = Chart::Gnuplot->new();
	my $dataSetactual = Chart::Gnuplot::DataSet->new(
	    xdata => $x1,
	    ydata => $y1,
	    title => $allcounty[$j].", ".$allstate[$j],
#		width => 5,
	style     => "points",
    pointtype => "fill-circle",
    color => "red",
		pointsize => 1
#	    style => "linespoints"
	#    ....
	);
	my $dataSetpred = Chart::Gnuplot::DataSet->new(
	    xdata => $x2,
	    ydata => $y2,
	    #title => $allcounty[$j].", ".$allstate[$j],
	    #title => "Model",
		width => 1,
	    style => "linespoints"
	#    ....
	);
	my $dataSetpredsf = Chart::Gnuplot::DataSet->new(
	    xdata => $x3,
	    ydata => $y3,
	    #title => $allcounty[$j].", ".$allstate[$j],
	    #title => "sofar",
		width => 1,
	    style => "linespoints"
	#    ....
	);
	my $dataSetpredbetter = Chart::Gnuplot::DataSet->new(
	    xdata => $x4,
	    ydata => $y4,
	    #title => $allcounty[$j].", ".$allstate[$j],
	    #title => "sofar",
		width => 1,
	    style => "linespoints"
	#    ....
	);
#	$mypredchart[$j]->add2d($dataSetactual, $dataSetpred, $dataSetpredsf, $dataSetpredbetter);
	$mypredchart[$j]->add2d($dataSetactual, $dataSetpred, $dataSetpredsf);
	
}

my @mychart2d;
my @mychartpred2d;
my @mychartmob2d;
my @mychartbeta2d;
for(my $i=0;$i<$#allstate/8;$i++) {
	for(my $j=0;$j<8;$j++) {
		if($i*8+$j<=$#allstate) {
			$mychart2d[$i][$j] = $mychart[$i*8+$j];
			$mychartmob2d[$i][$j] = $mymobchart[$i*8+$j];
			$mychartpred2d[$i][$j] = $mypredchart[$i*8+$j];
			$mychartbeta2d[$i][$j] = $mybetachart[$i*8+$j];
		}
	}
}
$chart->multiplot(\@mychart2d);
$predchart->multiplot(\@mychartpred2d);
$mobchart->multiplot(\@mychartmob2d);
$betachart->multiplot(\@mychartbeta2d);

##############################END#####################################################
##############################END#####################################################
##############################END#####################################################
##############################END#####################################################
##############################END#####################################################
##############################END#####################################################

sub quantpredict {
	my ($predx, $x, $y, $intercept, $slope, $myq) = @_;
	my $sumx=0.0;
	my $avex=0.0;
	my $cn=0;
	my $devsqsum=0.0;
	my $i;
	my $dev;
	for($i=0;$i<=$#{$x};$i++) {
		$sumx+=${$x}[$i];
		$dev = ${$y}[$i]-(${$x}[$i]*$slope+$intercept);
		$devsqsum+= $dev*$dev;
		$cn++;
	}
	if($cn>0) {$avex = $sumx/$cn;}
	else {print "No data here!!!\n";}
	my $f1=0.0;
	my $f2=0.0;
	my $devxsqsum=0.0;
	for($i=0;$i<=$#{$x};$i++) {
		$dev = ${$x}[$i] - $avex;
		$devxsqsum += $dev*$dev;
	}
	my $t=Statistics::Distributions::udistr($myq);
	#print("in quantpredict $cn, $avex, $devsqsum, $devxsqsum\n");
	return $predx*$slope+$intercept+$t*sqrt(($devsqsum/($cn-2))*((1.0/$cn)+($predx-$avex)*($predx-$avex)/$devxsqsum));
	#return $t*sqrt(($devsqsum/($cn-2))*((1.0/$cn)+($predx-$avex)*($predx-$avex)/$devxsqsum));
}

sub getprederror {
	my ($predx, $x, $y, $intercept, $slope) = @_;
	my $myq=0.159;
	my $sumx=0.0;
	my $avex=0.0;
	my $cn=0;
	my $devsqsum=0.0;
	my $i;
	my $dev;
	for($i=0;$i<=$#{$x};$i++) {
		$sumx+=${$x}[$i];
		$dev = ${$y}[$i]-(${$x}[$i]*$slope+$intercept);
		$devsqsum+= $dev*$dev;
		$cn++;
	}
	if($cn>0) {$avex = $sumx/$cn;}
	else {print "No data here!!!\n";}
	my $f1=0.0;
	my $f2=0.0;
	my $devxsqsum=0.0;
	for($i=0;$i<=$#{$x};$i++) {
		$dev = ${$x}[$i] - $avex;
		$devxsqsum += $dev*$dev;
	}
	my $t=Statistics::Distributions::udistr($myq);
	#print("in quantpredict $cn, $avex, $devsqsum, $devxsqsum\n");
	#return $predx*$slope+$intercept+$t*sqrt(($devsqsum/($cn-2))*((1.0/$cn)+($predx-$avex)*($predx-$avex)/$devxsqsum));
	return $t*sqrt(($devsqsum/($cn-2))*((1.0/$cn)+($predx-$avex)*($predx-$avex)/$devxsqsum));
}

sub forscaling {
	my ($state, $county, $beta, $alpha, $maxday, $fatalitydelay) = @_;
	my @x;
	my @y;
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];
	open(OUTPUT, ">scaling-$mobilitytype/$county"." "."$state");
	for(my $j=$startingday+$fatalitydelay;$j<=$maxday;$j++) {
		if(defined($data{$state}{$county}{CumMobility}[$j-$fatalitydelay])) {
			if($data{$state}{$county}{CumMobility}[$j-$fatalitydelay] * $alpha  > 0 && $data{$state}{$county}{DailyRA}[$j]/$initialfatality > 0 && log($data{$state}{$county}{DailyRA}[$j]/$initialfatality) - ($j-($startingday+$fatalitydelay)) * $beta > 1 ) {
				#$x[$j] = log($data{$state}{$county}{CumMobility}[$j-$fatalitydelay]);
				$x[$j] = log($data{$state}{$county}{CumMobility}[$j-$fatalitydelay]) + log($alpha);
				$y[$j] = log(log($data{$state}{$county}{DailyRA}[$j]/$initialfatality) - ($j-($startingday+$fatalitydelay)) * $beta);
				#$x[$j] = $data{$state}{$county}{CumMobility}[$j-$fatalitydelay] * $alpha;
				#$y[$j] = log($data{$state}{$county}{DailyRA}[$j]/$initialfatality) - ($j-($startingday+$fatalitydelay)) * $beta;
				print OUTPUT "$x[$j] $y[$j]\n";
			}
			#$dailypred[$j] = $initialfatality * exp();
		}
	}
	close(OUTPUT);
	return (\@x, \@y);
}


sub predict {
	my ($state, $county, $beta, $alpha, $maxday, $fatalitydelay) = @_;
	my @datepred;
	my @dateactual;
	my @dailypred;
	my @dailyactual;
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];
	for(my $j=$startingday+$fatalitydelay;$j<=$maxday;$j++) {
		if(defined($data{$state}{$county}{CumMobility}[$j-$fatalitydelay])) {
			$datepred[$j] = $j;
			$dailypred[$j] = $initialfatality * exp($data{$state}{$county}{CumMobility}[$j-$fatalitydelay] * $alpha + ($j-($startingday+$fatalitydelay)) * $beta);
		}
	}
	for(my $j=0;$j<=$maxday;$j++) {
		$dateactual[$j]=$j;
		$dailyactual[$j] = $data{$state}{$county}{DailyRA}[$j];
	}

	return (\@dateactual, \@dailyactual, \@datepred, \@dailypred);
}

sub predictnew {
	my ($state, $county, $beta, $alpha, $maxday, $fatalitydelay) = @_;
	my @datepred;
	my @dateactual;
	my @datepredsf;
	my @datepredbetter;
	my @dailypred;
	my @dailyactual;
	my @dailypredsf; #using alpha and beta up to data so far.
	my @dailypredbetter; # using alpha and beta using up to date data, AND, use the actual last known daily fataility, instead of reference date to forecast
	my $interestmfirst;
	my $interestmlast;
	
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];
	for(my $j=$startingday+$fatalitydelay;$j<=$maxday;$j++) {
		if(defined($data{$state}{$county}{CumMobility}[$j-$fatalitydelay])) {
			$datepred[$j] = $j;
			$dailypred[$j] = $initialfatality * exp($data{$state}{$county}{CumMobility}[$j-$fatalitydelay] * $alpha + ($j-($startingday+$fatalitydelay)) * $beta);
		}
		
	}
	for(my $j=$startingday+$fatalitydelay + 70;$j<=$maxday;$j++) {
		if(defined($data{$state}{$county}{CumMobility}[$j-$fatalitydelay])) {
			$datepredsf[$j] = $j;
			$datepredbetter[$j] = $j;
			my ($x, $y) = calcxysf($state, $county, $fatalitydelay, $j-$fatalitydelay);
			my $lineFit = Statistics::LineFit->new();
			$lineFit->setData ($x, $y) or die "Invalid data";
			my ($betasf, $alphasf) = $lineFit->coefficients();

			$dailypredsf[$j] = $initialfatality * exp($data{$state}{$county}{CumMobility}[$j-$fatalitydelay] * $alphasf + ($j-($startingday+$fatalitydelay)) * $betasf);
			$dailypredbetter[$j] = $data{$state}{$county}{DailyRA}[$j-$fatalitydelay] * exp(($data{$state}{$county}{CumMobility}[$j-$fatalitydelay] - $data{$state}{$county}{CumMobility}[$j-$fatalitydelay*2]) * $alphasf + $fatalitydelay * $betasf);
			if($state =~ 'New York') {
				#print("Here $j actual $data{$state}{$county}{DailyRA}[$j] predsf $dailypredsf[$j] better ",$dailypredbetter[$j] ," ", $betasf, " ",$alphasf," ", 	$data{$state}{$county}{DailyRA}[$j-$fatalitydelay*2] , " ", ($data{$state}{$county}{CumMobility}[$j-$fatalitydelay]-$data{$state}{$county}{CumMobility}[$j-$fatalitydelay*2]),"\n");
			}
			
		}
		
	}

	for(my $j=$startingday+$fatalitydelay;$j<=$maxday+30;$j++) {
		if($j == ( daycounts($interestm, 1) - daycounts($refm, $refd)) ) {
			$interestmfirst = $j;
		}
		if($j == ( daycounts($interestm, $daysinmonth[$interestm]) - daycounts($refm, $refd)) ) {
			$interestmlast = $j;			
		}
	}
	my ($x, $y) = calcxysf($state, $county, $fatalitydelay, $interestmfirst);
	my $lineFit = Statistics::LineFit->new();
	$lineFit->setData ($x, $y) or die "Invalid data";
	my ($betaim, $alphaim) = $lineFit->coefficients();
	my $impred = 0;
	my $imactual;
	if(defined($data{$state}{$county}{Cum}[$interestmlast]) && defined( $data{$state}{$county}{Cum}[$interestmfirst-1])) {
		$imactual = $data{$state}{$county}{Cum}[$interestmlast] - $data{$state}{$county}{Cum}[$interestmfirst-1];
	}
	else {
		$imactual = 0;
	}
	my $imra =0;
	if($county =~ "Union") {
		#check 150 day
		my $j = 150;
		my $preddaily = $initialfatality * exp($data{$state}{$county}{AllCumMobility}[$j-$fatalitydelay] * $alphaim + ($j-($startingday+$fatalitydelay)) * $betaim);
		my $ra = $data{$state}{$county}{DailyRA}[$j];
		#print("Just for 150, Union: $preddaily and $ra\n");
	}
	for(my $j=$interestmfirst;$j<=$interestmlast;$j++) {
		if($county =~ "Union") {
			#print("==$j== mobility defined? ".defined($data{$state}{$county}{Mobility}[$j-$fatalitydelay])." ......cummob defined? ".defined($data{$state}{$county}{CumMobility}[$j-$fatalitydelay])."\n");
			#print("Here====  ".($j-$fatalitydelay)." ".$data{$state}{$county}{AllCumMobility}[$j-$fatalitydelay]." ".$data{$state}{$county}{CumMobility}[$j-$fatalitydelay]."\n");
		}
#
		if(defined($data{$state}{$county}{AllCumMobility}[$j-$fatalitydelay])) {
			#$datepredsf[$j] = $j;
			$impred += $initialfatality * exp($data{$state}{$county}{AllCumMobility}[$j-$fatalitydelay] * $alphaim + ($j-($startingday+$fatalitydelay)) * $betaim);
			if(defined($data{$state}{$county}{DailyRA}[$j])) {
				$imra += $data{$state}{$county}{DailyRA}[$j];
			}
			else {
				$imra +=0;
			}
			if($state =~ "Florida") {
#				print("===$j==add ", $initialfatality * exp($data{$state}{$county}{CumMobility}[$j-$fatalitydelay] * $alphaim + ($j-($startingday+$fatalitydelay)) * $betaim),"\n");
			}
		}
		else {
			if($state =~ "Florida") {
#				print ("====$j=====not defined: ", $j-$fatalitydelay,"\n");
			}
		}
		
	}
	print ("interestm $data{$state}{$county}{Lat} $data{$state}{$county}{Long} $interestmfirst $interestmlast $interestm $imactual $imra $impred $alphaim $betaim\n");
	
		
	for(my $j=0;$j<=$maxday;$j++) {
		$dateactual[$j]=$j;
		$dailyactual[$j] = $data{$state}{$county}{DailyRA}[$j];
	}

	return (\@dateactual, \@dailyactual, \@datepred, \@dailypred, \@datepredsf, \@dailypredsf, \@datepredbetter, \@dailypredbetter);
}

###############Based on a date, predict each state, and then add up.....##################################
sub predictday {
	my ($state, $county, $beta, $alpha, $maxday, $fatalitydelay, $daynow) = @_;
	my @datepred;
	my @dateactual;
	my @datepredsf;
	my @datepredbetter;
	my @dailypred;
	my @dailyactual;
	my @dailypredsf; #using alpha and beta up to data so far.
	my @dailypredbetter; # using alpha and beta using up to date data, AND, use the actual last known daily fataility, instead of reference date to forecast
	my $interestmfirst;
	my $interestmlast;
	
	#$datepredsf[$j] = $j;
	#$datepredbetter[$j] = $j;
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];

	my ($x, $y) = calcxysf($state, $county, $fatalitydelay, $daynow);
	print("Debug: $state, $county, $fatalitydelay, $daynow\n");
	print("x is @$x\n");
	print("y is @$y\n");
	my $lineFit = Statistics::LineFit->new();
	$lineFit->setData ($x, $y) or die "Invalid data";
	my ($betasf, $alphasf) = $lineFit->coefficients();
	
	my $lastdayfatalityerror;
	my $sum=0.0;
	my $sumdev = 0.0;
	my $fatalitylastday = $data{$state}{$county}{FatalityLastDay} - 5 -$datesback;
	for(my $i=0;$i<11;$i++) {
		$sum+=$data{$state}{$county}{Daily}[$fatalitylastday-$i];
	}
	my $lastdayfatality = $sum/11.0;
	
	for(my $i=0;$i<11;$i++) {
		my $dev = $data{$state}{$county}{Daily}[$fatalitylastday-$i] - $lastdayfatality;
		$sum += $dev*$dev;
	}
	$lastdayfatalityerror = sqrt($sum/11.0)/sqrt(11.0);
	
	if(defined($data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay])) {
#		return $initialfatality * exp($data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay] * $alphasf + ($daynow-($startingday+$fatalitydelay)) * $betasf);
#		my $lastdayfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{FatalityLastDay}];
		my $cummobdiff = $data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay] - $data{$state}{$county}{CumMobility}[$fatalitylastday-$fatalitydelay] ;
		my $timediff = $daynow - $fatalitylastday;
		my $returnvalue = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf);
		#my $forecastquant = quantpredict($cummobdiff/$timediff, $x, $y, $betasf, $alphasf, $quantile[0]);
		my $forecasterror; #= getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		if($timediff<1) {
			$forecasterror = getprederror(0.0, $x, $y, $betasf, $alphasf);
		}
		else {
			$forecasterror = getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		}
		my $error1 = $lastdayfatalityerror * exp($cummobdiff*$alphasf + $timediff*$betasf);
		my $error2 = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf) * $forecasterror*$timediff;
		my $overallerror = $error1 + $error2;
		print("Error calculation($state): lastdayfatalityerror $lastdayfatalityerror forecasterror $forecasterror, $error1, $error2, $overallerror\n");
		#my $newreturn = $lastdayfatality*exp($forecastquant*$timediff);
		return ($returnvalue, $overallerror);
		
	}
	else {
#		my $estimatecummob = $data{$state}{$county}{CumMobility}[$maxday];
#		print("Padding Here: maxday $maxday cummob: $state, $county, $estimatecummob", " daynow $daynow", " padding days ",($daynow-$fatalitydelay-$maxday), "\n");
#		my $lastweek = $data{$state}{$county}{CumMobility}[$maxday] - $data{$state}{$county}{CumMobility}[$maxday-7];
#		$estimatecummob += $lastweek/7.0*($daynow-$fatalitydelay-$maxday);
#		my $returnvalue = $initialfatality * exp($estimatecummob * $alphasf + ($daynow-($startingday+$fatalitydelay)) * $betasf);
#		print("PredictDay estimatecummob $estimatecummob lastweekcummob $lastweek returnvalue $returnvalue\n");
#		return $returnvalue;
#		my $lastdayfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{FatalityLastDay}];
#		my $fatalitylastday = $data{$state}{$county}{FatalityLastDay};
		my $estimatecummob = $data{$state}{$county}{CumMobility}[$maxday];
		my $lastweek = $data{$state}{$county}{CumMobility}[$maxday] - $data{$state}{$county}{CumMobility}[$maxday-7];
		$estimatecummob += $lastweek/7.0*($daynow-$fatalitydelay-$maxday);
		my $cummobdiff = $estimatecummob - $data{$state}{$county}{CumMobility}[$fatalitylastday-$fatalitydelay] ;
		my $timediff = $daynow - $fatalitylastday;
		my $returnvalue = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf);
		print("Padding Here: fatalitylastday $fatalitylastday maxday $maxday cummob: $state, $county, $estimatecummob", " daynow $daynow", " padding days ",($daynow-$fatalitydelay-$maxday), "\n");
		my $forecastquant = quantpredict($cummobdiff/$timediff, $x, $y, $betasf, $alphasf, $quantile[0]);
		my $newreturn = $lastdayfatality*exp($forecastquant*$timediff);
		my $forecasterror = getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		my $error1 = $lastdayfatalityerror * exp($cummobdiff*$alphasf + $timediff*$betasf);
		my $error2 = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf) * $forecasterror*$timediff;
		my $overallerror = $error1 + $error2;
		print("Error calculation($state): lastdayfatalityerror $lastdayfatalityerror forecasterror $forecasterror, $error1, $error2, $overallerror\n");
		return ($returnvalue, $overallerror);
#		return $returnvalue;

	}
}

#Here beta and alpha is tuning ratio!!!
#NOT USING
sub predictdayvariation {
	my ($state, $county, $betar, $alphar, $maxday, $fatalitydelay, $daynow) = @_;
	my @datepred;
	my @dateactual;
	my @datepredsf;
	my @datepredbetter;
	my @dailypred;
	my @dailyactual;
	my @dailypredsf; #using alpha and beta up to data so far.
	my @dailypredbetter; # using alpha and beta using up to date data, AND, use the actual last known daily fataility, instead of reference date to forecast
	my $interestmfirst;
	my $interestmlast;
	
	#$datepredsf[$j] = $j;
	#$datepredbetter[$j] = $j;
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];

	my ($x, $y) = calcxysf($state, $county, $fatalitydelay, $daynow);
	my $lineFit = Statistics::LineFit->new();
	$lineFit->setData ($x, $y) or die "Invalid data";
	my ($betasf, $alphasf) = $lineFit->coefficients();

####################IMPORTANT#######################
	$betasf += $betar;
	$alphasf *= $alphar;
####################IMPORTANT#######################

	my $lastdayfatalityerror;
	my $sum=0.0;
	my $sumdev = 0.0;
	my $fatalitylastday = $data{$state}{$county}{FatalityLastDay} - 5 -$datesback;
	for(my $i=0;$i<11;$i++) {
		$sum+=$data{$state}{$county}{Daily}[$fatalitylastday-$i];
	}
	my $lastdayfatality = $sum/11.0;
	
	for(my $i=0;$i<11;$i++) {
		my $dev = $data{$state}{$county}{Daily}[$fatalitylastday-$i] - $lastdayfatality;
		$sum += $dev*$dev;
	}
	$lastdayfatalityerror = sqrt($sum/11.0)/sqrt(11.0);
	
	if(defined($data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay])) {
#		return $initialfatality * exp($data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay] * $alphasf + ($daynow-($startingday+$fatalitydelay)) * $betasf);
#		my $lastdayfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{FatalityLastDay}];
		my $cummobdiff = $data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay] - $data{$state}{$county}{CumMobility}[$fatalitylastday-$fatalitydelay] ;
		my $timediff = $daynow - $fatalitylastday;
		my $returnvalue = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf);
		#my $forecastquant = quantpredict($cummobdiff/$timediff, $x, $y, $betasf, $alphasf, $quantile[0]);
		my $forecasterror; #= getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		if($timediff<1) {
			$forecasterror = getprederror(0.0, $x, $y, $betasf, $alphasf);
		}
		else {
			$forecasterror = getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		}
		my $error1 = $lastdayfatalityerror * exp($cummobdiff*$alphasf + $timediff*$betasf);
		my $error2 = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf) * $forecasterror*$timediff;
		my $overallerror = $error1 + $error2;
		print("Error calculation($state): lastdayfatalityerror $lastdayfatalityerror forecasterror $forecasterror, $error1, $error2, $overallerror\n");
		#my $newreturn = $lastdayfatality*exp($forecastquant*$timediff);
		return ($returnvalue, $overallerror);
		
	}
	else {
#		my $estimatecummob = $data{$state}{$county}{CumMobility}[$maxday];
#		print("Padding Here: maxday $maxday cummob: $state, $county, $estimatecummob", " daynow $daynow", " padding days ",($daynow-$fatalitydelay-$maxday), "\n");
#		my $lastweek = $data{$state}{$county}{CumMobility}[$maxday] - $data{$state}{$county}{CumMobility}[$maxday-7];
#		$estimatecummob += $lastweek/7.0*($daynow-$fatalitydelay-$maxday);
#		my $returnvalue = $initialfatality * exp($estimatecummob * $alphasf + ($daynow-($startingday+$fatalitydelay)) * $betasf);
#		print("PredictDay estimatecummob $estimatecummob lastweekcummob $lastweek returnvalue $returnvalue\n");
#		return $returnvalue;
#		my $lastdayfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{FatalityLastDay}];
#		my $fatalitylastday = $data{$state}{$county}{FatalityLastDay};
		my $estimatecummob = $data{$state}{$county}{CumMobility}[$maxday];
		my $lastweek = $data{$state}{$county}{CumMobility}[$maxday] - $data{$state}{$county}{CumMobility}[$maxday-7];
		$estimatecummob += $lastweek/7.0*($daynow-$fatalitydelay-$maxday);
		my $cummobdiff = $estimatecummob - $data{$state}{$county}{CumMobility}[$fatalitylastday-$fatalitydelay] ;
		my $timediff = $daynow - $fatalitylastday;
		my $returnvalue = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf);
		print("Padding Here: fatalitylastday $fatalitylastday maxday $maxday cummob: $state, $county, $estimatecummob", " daynow $daynow", " padding days ",($daynow-$fatalitydelay-$maxday), "\n");
		my $forecastquant = quantpredict($cummobdiff/$timediff, $x, $y, $betasf, $alphasf, $quantile[0]);
		my $newreturn = $lastdayfatality*exp($forecastquant*$timediff);
		my $forecasterror = getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		my $error1 = $lastdayfatalityerror * exp($cummobdiff*$alphasf + $timediff*$betasf);
		my $error2 = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf) * $forecasterror*$timediff;
		my $overallerror = $error1 + $error2;
		print("Error calculation($state): lastdayfatalityerror $lastdayfatalityerror forecasterror $forecasterror, $error1, $error2, $overallerror\n");
		return ($returnvalue, $overallerror);
#		return $returnvalue;

	}
}


# Assume 50% shutdown
sub predictdayshutdown {
	my ($state, $county, $betadelta, $alpharatio, $maxday, $fatalitydelay, $daynow,$shutdowndays) = @_;
	my @datepred;
	my @dateactual;
	my @datepredsf;
	my @datepredbetter;
	my @dailypred;
	my @dailyactual;
	my @dailypredsf; #using alpha and beta up to data so far.
	my @dailypredbetter; # using alpha and beta using up to date data, AND, use the actual last known daily fataility, instead of reference date to forecast
	my $interestmfirst;
	my $interestmlast;
	
	#$datepredsf[$j] = $j;
	#$datepredbetter[$j] = $j;
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];

	my ($x, $y) = calcxysf($state, $county, $fatalitydelay, $daynow);
	my $lineFit = Statistics::LineFit->new();
	$lineFit->setData ($x, $y) or die "Invalid data";
	my ($betasf, $alphasf) = $lineFit->coefficients();
	
	my $lastdayfatalityerror;
	my $sum=0.0;
	my $sumdev = 0.0;
	my $fatalitylastday = $data{$state}{$county}{FatalityLastDay} - 5 -$datesback;
	for(my $i=0;$i<11;$i++) {
		$sum+=$data{$state}{$county}{Daily}[$fatalitylastday-$i];
	}
	my $lastdayfatality = $sum/11.0;
	
	for(my $i=0;$i<11;$i++) {
		my $dev = $data{$state}{$county}{Daily}[$fatalitylastday-$i] - $lastdayfatality;
		$sum += $dev*$dev;
	}
	$lastdayfatalityerror = sqrt($sum/11.0)/sqrt(11.0);
	
	if(defined($data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay])) {
#		return $initialfatality * exp($data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay] * $alphasf + ($daynow-($startingday+$fatalitydelay)) * $betasf);
#		my $lastdayfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{FatalityLastDay}];
		my $cummobdiff = $data{$state}{$county}{CumMobility}[$daynow-$fatalitydelay] - $data{$state}{$county}{CumMobility}[$fatalitylastday-$fatalitydelay] ;
		my $timediff = $daynow - $fatalitylastday;
		my $returnvalue = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf);
		#my $forecastquant = quantpredict($cummobdiff/$timediff, $x, $y, $betasf, $alphasf, $quantile[0]);
		my $forecasterror; #= getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		if($timediff<1) {
			$forecasterror = getprederror(0.0, $x, $y, $betasf, $alphasf);
		}
		else {
			$forecasterror = getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		}
		my $error1 = $lastdayfatalityerror * exp($cummobdiff*$alphasf + $timediff*$betasf);
		my $error2 = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf) * $forecasterror*$timediff;
		my $overallerror = $error1 + $error2;
		print("Error calculation($state): lastdayfatalityerror $lastdayfatalityerror forecasterror $forecasterror, $error1, $error2, $overallerror\n");
		#my $newreturn = $lastdayfatality*exp($forecastquant*$timediff);
		return ($returnvalue, $overallerror);
		
	}
	else {
#		my $estimatecummob = $data{$state}{$county}{CumMobility}[$maxday];
#		print("Padding Here: maxday $maxday cummob: $state, $county, $estimatecummob", " daynow $daynow", " padding days ",($daynow-$fatalitydelay-$maxday), "\n");
#		my $lastweek = $data{$state}{$county}{CumMobility}[$maxday] - $data{$state}{$county}{CumMobility}[$maxday-7];
#		$estimatecummob += $lastweek/7.0*($daynow-$fatalitydelay-$maxday);
#		my $returnvalue = $initialfatality * exp($estimatecummob * $alphasf + ($daynow-($startingday+$fatalitydelay)) * $betasf);
#		print("PredictDay estimatecummob $estimatecummob lastweekcummob $lastweek returnvalue $returnvalue\n");
#		return $returnvalue;
#		my $lastdayfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{FatalityLastDay}];
#		my $fatalitylastday = $data{$state}{$county}{FatalityLastDay};
		my $estimatecummob = $data{$state}{$county}{CumMobility}[$maxday];
		my $lastweek = $data{$state}{$county}{CumMobility}[$maxday] - $data{$state}{$county}{CumMobility}[$maxday-7];
		###########Assume lockdown so that the mobility would be 50%!
		if(($daynow-$fatalitydelay-$maxday)<=$shutdowndays) {
			$estimatecummob += 0.5*($daynow-$fatalitydelay-$maxday);
		}
		else {
			$estimatecummob += 0.5*$shutdowndays;
			$estimatecummob += $lastweek/7.0*($daynow-$fatalitydelay-$maxday-$shutdowndays);
		}

		my $cummobdiff = $estimatecummob - $data{$state}{$county}{CumMobility}[$fatalitylastday-$fatalitydelay] ;
		my $timediff = $daynow - $fatalitylastday;
		my $returnvalue = $lastdayfatality*exp($cummobdiff*($alpharatio*$alphasf) + $timediff*($betasf+$betadelta));
		print("Padding Here: fatalitylastday $fatalitylastday maxday $maxday cummob: $state, $county, $estimatecummob", " daynow $daynow", " padding days ",($daynow-$fatalitydelay-$maxday), "\n");
		my $forecastquant = quantpredict($cummobdiff/$timediff, $x, $y, $betasf, $alphasf, $quantile[0]);
		my $newreturn = $lastdayfatality*exp($forecastquant*$timediff);
		my $forecasterror = getprederror($cummobdiff/$timediff, $x, $y, $betasf, $alphasf);
		my $error1 = $lastdayfatalityerror * exp($cummobdiff*$alphasf + $timediff*$betasf);
		my $error2 = $lastdayfatality*exp($cummobdiff*$alphasf + $timediff*$betasf) * $forecasterror*$timediff;
		my $overallerror = $error1 + $error2;
		print("Error calculation($state): lastdayfatalityerror $lastdayfatalityerror forecasterror $forecasterror, $error1, $error2, $overallerror\n");
		return ($returnvalue, $overallerror);
#		return $returnvalue;

	}
}


sub calcxy {
	my ($state, $county, $fatalitydelay) = @_;
	my @x;
	my @y;
	my @cummobility;
	my $cn = 0;
	my $currentcum=0.0;
	my $shift = $allshift; #20 before!!!
	my $mobility = $data{$state}{$county}{Mobility};
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];
#	for (my $j=0;$j<$#$mobility;$j++) {$x[$j]=$y[$j]=0;}
	
	for(my $j=$startingday+1;$j<=$#$mobility;$j++) {
		if(defined($data{$state}{$county}{Mobility}[$j]) && defined($data{$state}{$county}{DailyRA}[$j+$fatalitydelay])) {
			$currentcum +=  (1.0+$data{$state}{$county}{Mobility}[$j]*0.01);
			$cummobility[$j] = $currentcum;
			$data{$state}{$county}{CumMobility}[$j] = $currentcum;
		}
	}

	$currentcum = 0;
	for(my $j=$startingday+1;$j<=$#$mobility;$j++) {
		if(defined($data{$state}{$county}{Mobility}[$j])) {
			$currentcum +=  (1.0+$data{$state}{$county}{Mobility}[$j]*0.01);
			$data{$state}{$county}{AllCumMobility}[$j] = $currentcum;
		}
	}

	for (my $j=$startingday+$shift;$j<$#$mobility;$j++) {
		if(defined($data{$state}{$county}{Mobility}[$j]) && defined($data{$state}{$county}{DailyRA}[$j+$fatalitydelay])) {
			if($data{$state}{$county}{DailyRA}[$j+$fatalitydelay]>0) {
				push(@x, $cummobility[$j]*1.0/($j-$startingday));
				push(@y, log($data{$state}{$county}{DailyRA}[$j+$fatalitydelay]/$initialfatality)/($j-$startingday));
			}
			#$x[$j]=$cummobility[$j]*1.0/($j-$startingday);
			#$y[$j]=log($data{$state}{$county}{DailyRA}[$j+$fatalitydelay]/$initialfatality)/($j-$startingday);
		}
	}
	for (my $j=$startingday+1;$j<$#$mobility;$j++) {
		if(defined($data{$state}{$county}{Mobility}[$j]) && defined($data{$state}{$county}{DailyRA}[$j+$fatalitydelay])) {
			#print("$j $x[$j] $y[$j] $data{$state}{$county}{Mobility}[$j] $cummobility[$j]\n");
		}
	}

	return (\@x, \@y);
}

sub calcxysf {
	my ($state, $county, $fatalitydelay, $maxsf) = @_;
	my @x;
	my @y;
	my @cummobility;
	my $cn = 0;
	my $currentcum=0.0;
	my $shift = $allshift;
	my $mobility = $data{$state}{$county}{Mobility};
	my $startingday = $data{$state}{$county}{StartingDay}-$fatalitydelay;
	my $initialfatality = $data{$state}{$county}{DailyRA}[$data{$state}{$county}{StartingDay}];
#	for (my $j=0;$j<$#$mobility;$j++) {$x[$j]=$y[$j]=0;}
	
	for(my $j=$startingday+1;$j<=$maxsf;$j++) {
		if(defined($data{$state}{$county}{Mobility}[$j]) && (1||defined($data{$state}{$county}{DailyRA}[$j+$fatalitydelay]))) {
			$currentcum +=  (1.0+$data{$state}{$county}{Mobility}[$j]*0.01);
			$cummobility[$j] = $currentcum;
			$data{$state}{$county}{CumMobility}[$j] = $currentcum;
		}
	}
	
	for (my $j=$startingday+$shift;$j<$maxsf;$j++) {
		if(defined($data{$state}{$county}{Mobility}[$j]) && defined($data{$state}{$county}{DailyRA}[$j+$fatalitydelay])) {
			if($data{$state}{$county}{DailyRA}[$j+$fatalitydelay]>0) {
				push(@x, $cummobility[$j]*1.0/($j-$startingday));
				push(@y, log($data{$state}{$county}{DailyRA}[$j+$fatalitydelay]/$initialfatality)/($j-$startingday));
			}
			#$x[$j]=$cummobility[$j]*1.0/($j-$startingday);
			#$y[$j]=log($data{$state}{$county}{DailyRA}[$j+$fatalitydelay]/$initialfatality)/($j-$startingday);
		}
	}
	for (my $j=$startingday+1;$j<$maxsf;$j++) {
		if(defined($data{$state}{$county}{Mobility}[$j]) && defined($data{$state}{$county}{DailyRA}[$j+$fatalitydelay])) {
			#print("$j $x[$j] $y[$j] $data{$state}{$county}{Mobility}[$j] $cummobility[$j]\n");
		}
	}

	return (\@x, \@y);
}

sub plotit {
	my ($x, $y, $filename) = @_;
	my $chart = Chart::Gnuplot->new(
	    output => $filename,
	    terminal => "png",
	    title  => "Simple testing",
	    xlabel => "My x-axis label",
	    ylabel => "My y-axis label",
	    imagesize => "1024, 768",
	    xtics => { fontsize => "40"}
	);
	# Create dataset object and specify the properties of the dataset
	my $dataSet = Chart::Gnuplot::DataSet->new(
	    xdata => $x,
	    ydata => $y,
	    title => "Plotting a line from Perl arrays",
	    style => "linespoints"
	#    ....
	);

	# Plot the data set on the chart
	$chart->plot2d($dataSet);

}

sub plotit2 {
	my ($x1, $y1, $x2, $y2, $filename) = @_;
	my $chart = Chart::Gnuplot->new(
	    output => $filename,
	    terminal => "png",
	    title  => "Simple testing",
	    xlabel => "My x-axis label",
	    ylabel => "My y-axis label",
	    imagesize => "1024, 768",
	    xtics => { fontsize => "40"}
	);
	# Create dataset object and specify the properties of the dataset
	my $dataSet1 = Chart::Gnuplot::DataSet->new(
	    xdata => $x1,
	    ydata => $y1,
	    title => "Plotting a line from Perl arrays",
	    style => "linespoints"
	#    ....
	);

	my $dataSet2 = Chart::Gnuplot::DataSet->new(
	    xdata => $x2,
	    ydata => $y2,
	    title => "Plotting a line from Perl arrays",
	    style => "linespoints"
	#    ....
	);

	# Plot the data set on the chart
	$chart->plot2d($dataSet1,$dataSet2);

}