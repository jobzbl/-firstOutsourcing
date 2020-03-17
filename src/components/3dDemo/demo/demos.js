var myJmol = 'myJmol';
var JmolInfo = {
	width:'100%',
	height:'100%',
	color:'#E2F4F5',
	j2sPath:'../../jmol/j2s',
	serverURL:'../../jmol/php/jsmol.php',
	use:'html5'
}
$(document).ready(function(){
	$('#JmolOuterDiv').css(	{ 'width':'calc( 100% - 1.2em )', 'border':'1px dotted gray', 'border-radius':'0.6em', 'padding':'0.6em', 'min-height':'90vmin' } );
	$('#JmolOuterDiv').prepend( '<div id="JmolInnerDiv" style="width:90vmin; height:90vmin; float:left; margin-right:0.6em;"></div>' );
  $('#JmolInnerDiv').html( Jmol.getAppletHtml(myJmol, JmolInfo) );
});
