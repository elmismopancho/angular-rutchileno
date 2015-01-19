angular.module('rutchileno', [])

.directive('rutchileno', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        var valid = false;

        rut = viewValue.replace(/\./g, '');

        if (rut.toString().trim() != '' && rut.toString().indexOf('-') > 0) {
          var caracteres = new Array();
          var serie = new Array(2, 3, 4, 5, 6, 7);
          var dig = rut.toString().substr(rut.toString().length - 1, 1);
          rut = rut.toString().substr(0, rut.toString().length - 2);
   
          for (var i = 0; i < rut.length; i++) {
              caracteres[i] = parseInt(rut.charAt((rut.length - (i + 1))));
          }
   
          var sumatoria = 0;
          var k = 0;
          var resto = 0;
   
          for (var j = 0; j < caracteres.length; j++) {
              if (k == 6) {
                  k = 0;
              }
              sumatoria += parseInt(caracteres[j]) * parseInt(serie[k]);
              k++;
          }
   
          resto = sumatoria % 11;
          dv = 11 - resto;
   
          if (dv == 10) {
              dv = "K";
          }
          else if (dv == 11) {
              dv = 0;
          }
   
          if (dv.toString().trim().toUpperCase() == dig.toString().trim().toUpperCase())
              valid = true;
        }

        if (valid) {
          ctrl.$setValidity('rutchileno', true);
          return viewValue;
        } else {
          ctrl.$setValidity('rutchileno', false);
          return undefined;
        }
      });
      ctrl.$parsers.unshift(function(viewValue) {
        if (!viewValue)
          return viewValue;

        var formatted = viewValue.toUpperCase();

		formatted = formatted.replace(/\./g, '');
		formatted = formatted.replace(/-/g, '');

		if (formatted.length >= 8) {
			var dig = formatted.toString().substr(formatted.toString().length - 1, 1);
			var rut = formatted.toString().substr(0, formatted.toString().length - 1);

			var cen = rut.toString().substr(rut.toString().length - 3);
			var mil = rut.toString().substr(rut.toString().length - 6, 3);
			var res = rut.toString().substring(0, rut.toString().length - 6);

			formatted = res+"."+mil+"."+cen+"-"+dig;
		} else {
			if (formatted.length > 3 && formatted.length <= 6) {
				var cen = formatted.toString().substr(formatted.toString().length - 3);
				var res = formatted.toString().substring(0, formatted.toString().length - 3);

				formatted = res+"."+cen;
			} else if (formatted.length > 6) {
				var cen = formatted.toString().substr(formatted.toString().length - 3);
				var mil = formatted.toString().substr(formatted.toString().length - 6, 3);
				var res = formatted.toString().substring(0, formatted.toString().length - 6);

				formatted = res+"."+mil+"."+cen;
			}
		}

        if(formatted !== viewValue) {
          ctrl.$setViewValue(formatted);
          ctrl.$render();
        } 

        return formatted;
      });
    }
  };
})