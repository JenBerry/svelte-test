const $ = require('jquery');
$(function(){

	function openFilterList(){
		$('.filter-list').addClass('open');
	}
	function closeFilterList(){
		$('.filter-list').removeClass('open');
	}

	$('.main-input').focus(function(){
		openFilterList();
	});

	$('.filter-box').click(function(e){
		var target = $(e.target);
		if (target !== $('.filter')&& target.parents('.filter').length === 0)
		{
			openFilterList();
			$('.main-input').focus();
		}
	})

	$(document).click(function(e){
		var target = $(e.target);
		if(target.parents('.filter-box').length  === 0 
			&& target !== $('.filter-box')
			){
			closeFilterList();
			$('.main-input').blur();
		}
	});

});