UPDATE Core.WorkflowInstances Set DAta=@data,
 StepId=@stepid, StepNameCaption=@stepnamecaption, StepCaption=@stepcaption
 where InstanceSID=@Id