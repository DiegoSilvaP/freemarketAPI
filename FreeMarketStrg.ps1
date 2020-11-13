# get table context
Add-AzAccount
Get-AzSubscription -SubscriptionId "" | Set-AzContext
$location = "westus"
$resourceGroup = "freemarket-rg"
# Create storage account
$storageAccount = New-AzStorageAccount -ResourceGroupName $resourceGroup `
    -Name "freemarketacc" `
    -Location $location `
    -SkuName "Standard_LRS" `
    -Kind "StorageV2"
$ctx = $storageAccount.Context

# Create new table
$tableName = "items"
New-AzStorageTable -Name $tableName -Context $ctx

# $storageTable = Get-AzStorageTable -Name $tableName -Context $ctx
$cloudTable = (Get-AzStorageTable -Name $tableName -Context $ctx).CloudTable

$partitionKey1 = "partition1"
$partitionKey2 = "partition2"

# add four rows 
Add-AzTableRow `
    -table $cloudTable `
    -partitionKey $partitionKey1 `
    -rowKey ("electronicos") `
    -property @{"title"="Galaxy s10 128gb";"price"="16999";}

Add-AzTableRow `
    -table $cloudTable `
    -partitionKey $partitionKey2 `
    -rowKey ("electronicos") `
    -property @{"title"="Pantalla Hisense 4k 55inc";"price"="13099";}