﻿using System.Collections;
using System.Collections.Generic;

namespace TourManagement.API.Dtos
{
    public class TourWithShowsForCreation:TourForCreation
    {
        public ICollection<ShowsForCreation> Shows { get; set; } = 
            new List<ShowsForCreation>();
    }
}