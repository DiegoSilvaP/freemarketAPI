$rg = 'freemarket-rg'

New-AzResourceGroupDeployment `
    -Name 'freemarketfunc' `
    -ResourceGroupName $rg `
    -TemplateFile 'ArmFunctionApp.json' `
    -appName 'freemarketfunc'